<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\Counters;
use OCA\NCDownloader\Tools\DBConn;
use OCA\NCDownloader\Tools\Helper;
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

    public function __construct($appName, IRequest $request, $UserId, IL10N $IL10N, Aria2 $aria2)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->l10n = $IL10N;
        //$this->rootFolder = $rootFolder;
        OC_Util::setupFS();
        $this->aria2 = $aria2;
        $this->aria2->init();
        $this->dbconn = new DBConn();
        $this->counters = new Counters($aria2, $this->dbconn, $UserId);
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
        $params = array();
        $params['aria2_running'] = $this->aria2->isRunning();
        $params['aria2_installed'] = $this->aria2->isInstalled();
        $params['youtube_installed'] = (bool) Helper::findBinaryPath('youtube-dl');
        $params['counter'] = $this->counters->getCounters();

        $response = new TemplateResponse($this->appName, 'Index', $params);

        return $response;
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Download()
    {
        $url = trim($this->request->getParam('text-input-value'));
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

}
