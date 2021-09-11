<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Search\torrentSearch;
use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\DBConn;
use OCA\NCDownloader\Tools\File;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Youtube;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;
//use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IRequest;
use OC_Util;
use \OCP\AppFramework\Http\StrictContentSecurityPolicy;

class MainController extends Controller
{

    private $settings = null;
    //@config OC\AppConfig
    private $config;
    private $aria2Opts;
    private $l10n;

    public function __construct($appName, IRequest $request, $UserId, IL10N $IL10N, Youtube $youtube, Aria2 $aria2)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->l10n = $IL10N;
        $this->dataDir = \OC::$server->getSystemConfig()->getValue('datadirectory');
        //$this->rootFolder = $rootFolder;
        OC_Util::setupFS();
        $this->urlGenerator = \OC::$server->getURLGenerator();
        $this->aria2 = $aria2;
        $this->aria2->init();
        $this->youtube = $youtube;
        $this->dbconn = new DBConn();
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
        OC_Util::addStyle($this->appName, 'style');
        OC_Util::addStyle($this->appName, 'table');
        $params = array();
        $params['aria2_running'] = $this->aria2->isRunning();
        $params['aria2_installed'] = $this->aria2->isInstalled();
        $params['youtube_installed'] = $this->youtube->isInstalled();

        $response = new TemplateResponse($this->appName, 'Index', $params);

        $csp = new StrictContentSecurityPolicy();
        $csp->allowEvalScript();
        $csp->allowInlineStyle();

        $response->setContentSecurityPolicy($csp);

        return $response;
    }

    public function newDownload()
    {
        $params = array();
        $inputValue = trim($this->request->getParam('form_input_text'));
        $type = trim($this->request->getParam('type'));
        if ($type == 'ytdl') {
            $yt = $this->youtube;
            if (!$yt->isInstalled()) {
                try {
                    $filename = Helper::getFileName($yt->installUrl());
                    $this->aria2->setDownloadDir($this->dataDir . "/bin");
                    $resp = $this->Save($yt->installUrl(), $filename);
                    return new JSONResponse($resp);
                } catch (\Exception $e) {
                    return new JSONResponse(['error' => $e->getMessage()]);
                }

                return new JSONResponse(['error' => $this->l10n->t("Youtube-dl NOT installed!")]);
            }
            $resp = $yt->forceIPV4()->download($inputValue);
            File::syncFolder();
            return new JSONResponse(['yt' => $resp]);

        } else if ($type === 'search') {
            $data = torrentSearch::go($inputValue);
            $resp['title'] = ['title', 'seeders', 'info', 'actions'];
            $resp['row'] = $data;
            return new JSONResponse($resp);
        }

        $filename = Helper::getFileName($inputValue);
        $resp = $this->Save($inputValue, $filename);
        return new JSONResponse($resp);
    }

    private function Save($url, $filename = null)
    {
        if (isset($filename)) {
            $this->aria2->setFileName($filename);
        }
        //$this->aria2->setDownloadDir("/tmp/downloads");
        $result = $this->aria2->addUri([$url]);
        $gid = $result['result'];
        if (!is_string($gid)) {
            return ['error' => 'Failed to add download task! ' . $result['error']];
        } else {
            $data = [
                'uid' => $this->uid,
                'gid' => $gid,
                'type' => 1,
                'filename' => $filename ?? 'unknown',
                'timestamp' => time(),
                'data' => serialize(['link' => $url]),
            ];
            $this->dbconn->save($data);
        }
        return ['gid' => $gid, 'file' => $filename, 'result' => $gid];
    }
}
