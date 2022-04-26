<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\Counters;
use OCA\NCDownloader\Tools\DbHelper;
use OCA\NCDownloader\Tools\folderScan;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OCA\NCDownloader\Tools\Youtube;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;
//use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IRequest;
use OC_Util;

class MainController extends Controller
{

    private $settings = null;
    //@config OC\AppConfig
    private $config;
    private $aria2Opts;
    private $l10n;

    public function __construct($appName, IRequest $request, $UserId, IL10N $IL10N, Aria2 $aria2, Youtube $youtube)
    {

        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->l10n = $IL10N;
        //$this->rootFolder = $rootFolder;
        $this->aria2 = $aria2;
        $this->aria2->init();
        $this->urlGenerator = \OC::$server->getURLGenerator();
        $this->dbconn = new DbHelper();
        $this->counters = new Counters($aria2, $this->dbconn, $UserId);
        $this->youtube = $youtube;
        $this->isAdmin = \OC_User::isAdminUser($this->uid);
        $this->hideError = Helper::getSettings("ncd_hide_errors", false);
        $this->disable_bt_nonadmin = Helper::getSettings("ncd_disable_bt", false, Settings::TYPE["SYSTEM"]);
        $this->accessDenied = $this->l10n->t("Sorry,only admin users can download files via BT!");
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Index()
    {
        // $str = \OC::$server->getDatabaseConnection()->getInner()->getPrefix();
        //$config = \OC::$server->getAppConfig();
        OC_Util::addScript($this->appName, 'app');
        // OC_Util::addStyle($this->appName, 'table');
        $params = $this->buildParams();
        $response = new TemplateResponse($this->appName, 'Index', $params);
        return $response;
    }

    private function buildParams(): array
    {
        $params = [];
        $params['aria2_running'] = $this->aria2->isRunning();
        $params['aria2_installed'] = $aria2_installed = $this->aria2->isInstalled();
        $params['aria2_bin'] = $aria2_bin = $this->aria2->getBin();
        $params['aria2_executable'] = $aria2_executable = $this->aria2->isExecutable();
        $params['youtube_installed'] = $youtube_installed = $this->youtube->isInstalled();
        $params['youtube_bin'] = $youtube_bin = $this->youtube->getBin();
        $params['youtube_executable'] = $youtube_executable = $this->youtube->isExecutable();
        $params['ncd_hide_errors'] = $this->hideError;
        $params['counter'] = $this->counters->getCounters();
        $params['python_installed'] = Helper::pythonInstalled();
        $params['ffmpeg_installed'] = Helper::ffmpegInstalled();
        $params['is_admin'] = $this->isAdmin;
        $sites = [];
        foreach (Helper::getSearchSites() as $site) {
            $label = $site['class']::getLabel();
            $sites[] = ['name' => $site['name'], 'label' => strtoupper($label)];
        }
        $params['search_sites'] = json_encode($sites);

        $errors = [];
        if ($aria2_installed) {
            if (!$aria2_executable) {
                array_push($errors, sprintf("aria2 is installed but don't have the right permissions.Please execute command sudo chmod 755 %s", $aria2_bin));
            }
            if (!$params['aria2_running']) {
                array_push($errors, $this->l10n->t("Aria2c is not running!"));
            }
        }
        if ($youtube_installed && (!$youtube_executable || !@is_readable($youtube_bin))) {
            array_push($errors, sprintf("youtube-dl is installed but don't have the right permissions.Please execute command sudo chmod 755 %s", $youtube_bin));
        }

        foreach ($params as $key => $value) {
            if (strpos($key, "_") === false) {
                continue;
            }
            list($name, $suffix) = explode("_", $key);
            if ($suffix !== "installed") {
                continue;
            }
            if (!$value) {
                array_push($errors, $this->l10n->t(sprintf("%s is not installed", $name)));
            }
        }
        $params['errors'] = $errors;

        $params['settings'] = json_encode([
            'is_admin' => $this->isAdmin,
            'admin_url' => $this->urlGenerator->linkToRoute("settings.AdminSettings.index", ['section' => 'ncdownloader']),
            'personal_url' => $this->urlGenerator->linkToRoute("settings.PersonalSettings.index", ['section' => 'ncdownloader']),
            'ncd_hide_errors' => $this->hideError,
            'ncd_disable_bt' => $this->disable_bt_nonadmin,
        ]);
        return $params;
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Download()
    {
        $dlDir = $this->aria2->getDownloadDir();
        if (!is_writable($dlDir)) {
            return new JSONResponse(['error' => sprintf("%s is not writable", $dlDir)]);
        }
        $url = trim($this->request->getParam('text-input-value'));
        if (Helper::isMagnet($url)) {
            if ($this->disable_bt_nonadmin && !($this->isAdmin)) {
                return new JSONResponse(['error' => $this->accessDenied]);
            }
        }
        //$type = trim($this->request->getParam('type'));
        $resp = $this->_download($url);
        return new JSONResponse($resp);
    }

    private function _download($url)
    {
        if ($filename = Helper::getFileName($url)) {
            $this->aria2->setFileName($filename);
        }
        if (!($result = $this->aria2->download($url))) {
            return ['error' => 'failed to download the file for some reason!'];
        }
        if (isset($result['error'])) {
            return $result;
        }

        $data = [
            'uid' => $this->uid,
            'gid' => $result,
            'type' => Helper::DOWNLOADTYPE['ARIA2'],
            'filename' => $filename ?? 'unknown',
            'timestamp' => time(),
            'data' => serialize(['link' => $url]),
        ];
        $this->dbconn->save($data);
        $resp = ['message' => $filename, 'result' => $result, 'file' => $filename];
        return $resp;
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Upload()
    {
        if ($this->disable_bt_nonadmin && !$this->isAdmin) {
            return new JSONResponse(['error' => $this->l10n->t($this->accessDenied)]);
        }
        if (is_uploaded_file($file = $_FILES['torrentfile']['tmp_name'])) {
            $file = $this->aria2->getTorrentsDir() . '/' . Helper::cleanString($_FILES['torrentfile']['name']);

            move_uploaded_file($_FILES['torrentfile']['tmp_name'], $file);

            if (!($result = $this->aria2->btDownload($file))) {
                return ['error' => 'failed to download the file for some reason!'];
            }
            if (isset($result['error'])) {
                return $result;
            }
            $data = [
                'uid' => $this->uid,
                'gid' => $result['gid'],
                'type' => Helper::DOWNLOADTYPE['ARIA2'],
                'filename' => $result['filename'] ?? 'unknown',
                'timestamp' => time(),
            ];
            $this->dbconn->save($data);
            $resp = ['message' => $result['filename'], 'result' => $result['gid'], 'file' => $result['filename']];
        }
        return new JSONResponse($resp);
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function scanFolder()
    {
        $resp = folderScan::create()->scan();
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function getCounters(): JSONResponse
    {
        $counter = $this->counters->getCounters();
        return new JSONResponse(['counter' => $counter]);
    }

}
