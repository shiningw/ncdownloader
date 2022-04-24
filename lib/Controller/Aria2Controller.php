<?php
namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\Counters;
use OCA\NCDownloader\Tools\DbHelper;
use OCA\NCDownloader\Tools\folderScan;
use OCA\NCDownloader\Tools\Helper;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IRequest;
use OC_Util;
use \OC\Files\Filesystem;

class Aria2Controller extends Controller
{
    private $uid;
    private $settings = null;
    //@config OC\AppConfig
    private $config;
    private $l10n;
    private $minmax = [0, 999];

    public function __construct($appName, IRequest $request, $UserId, IL10N $IL10N, IRootFolder $rootFolder, Aria2 $aria2)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->l10n = $IL10N;
        $this->rootFolder = $rootFolder;
        $this->urlGenerator = \OC::$server->getURLGenerator();
        $this->downloadDir = Helper::getDownloadDir();
        OC_Util::setupFS();
        //$this->config = \OC::$server->getAppConfig();
        $this->aria2 = $aria2;
        $this->aria2->init();
        $this->dbconn = new DbHelper();
        $this->counters = new Counters($aria2, $this->dbconn, $UserId);

    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Action($path)
    {
        $path = strtolower(trim($path));
        $resp = [];

        if (!in_array($path, ['start', 'check']) && !($gid = $this->request->getParam('gid'))) {
            return new JSONResponse(['error' => "no gid value is received!"]);
        }
        switch (strtolower($path)) {
            case "check":
                $resp = $this->aria2->isRunning();
                break;
            case "start":
                $resp = $this->Start();
                break;
            case "unpause":
            case "remove":
            case "pause":
                $resp = $this->doAction($path, $gid);
                if ($path === "remove" && isset($resp['status']) && $resp['status']) {
                    $this->dbconn->deleteByGid($gid);
                }
                break;
            case "get":
                $resp = $this->doAction('tellStatus', $gid);
                break;
            case 'purge':
                $resp = $this->doAction('removeDownloadResult', $gid);
                if (isset($resp['status']) && $resp['status']) {
                    $this->dbconn->deleteByGid($gid);
                }
        }
        return new JSONResponse($resp);
    }

    private function doAction($action, $gid)
    {
        if (!$action || !$gid) {
            return [];
        }
        $resp = $this->aria2->{$action}($gid);
        if (isset($resp['result'])) {
            switch ($action) {
                case "pause":
                    $this->dbconn->updateStatus($gid, Helper::STATUS['PAUSED']);
                    break;
                case "unpause":
                    $this->dbconn->updateStatus($gid);
                    break;
            }
        }
        if (in_array($action, ['removeDownloadResult', 'remove'])) {
            $result = $resp['result'] ?? null;
            if (isset($result)) {
                if (strtolower($result) === 'ok') {
                    return ['message' => $this->l10n->t("DONE!"), 'status' => 1];
                }
                if (is_string($result)) {
                    return ['message' => $this->l10n->t("DONE!"), 'status' => 1];
                }
            } else {
                return ['error' => $this->l10n->t("FAILED!"), 'status' => 0];
            }
        }
        return $resp;

    }
    private function Start()
    {
        if ($this->aria2->isRunning()) {
            $data = ['status' => (bool) $this->aria2->stop()];
            return $data;
        }
        $data = $this->aria2->start();
        return $data;
    }

    private function createActionItem($name, $path)
    {
        return array(
            'name' => $name,
            'path' => $this->urlGenerator->linkToRoute('ncdownloader.Aria2.Action', ['path' => $path]),
        );
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function getStatus($path)
    {
        //$path = $this->request->getRequestUri();
        $counter = $this->counters->getCounters();
        folderScan::sync();
        switch (strtolower($path)) {
            case "active":
                $resp = $this->aria2->tellActive();
                break;
            case "waiting":
                $resp = $this->aria2->tellWaiting($this->minmax);
                break;
            case "complete":
                $resp = $this->aria2->tellStopped($this->minmax);
                break;
            case "fail":
                $resp = $this->aria2->tellFail($this->minmax);
                break;
            default:
                $resp = $this->aria2->tellActive();
        }
        if (isset($resp['error'])) {
            return new JSONResponse($resp);
        }
        $data = $this->transformResp($resp);
        $data['counter'] = $counter;
        return new JSONResponse($data);
    }
    private function transformResp($resp)
    {

        $data = [];
        if (empty($resp)) {
            return $data;
        }
        $data['row'] = [];
        $resp = $this->filterData($resp);
        foreach ($resp as $value) {

            $gid = $value['following'] ?? $value['gid'];
            if ($row = $this->dbconn->getByGid($gid)) {
                $filename = $row['filename'];
                $timestamp = $row['timestamp'];
                $extra = $this->dbconn->getExtra(($row['data']));
            } else if (isset($value['files'][0]['path'])) {
                $parts = explode("/", ($path = $value['files'][0]['path']));
                if (count($parts) > 1) {
                    $filename = basename(dirname($path));
                } else {
                    $filename = basename($path);
                }
            } else {
                $filename = "Unknown";
            }
            if (!isset($value['completedLength'])) {
                continue;
            }
            //internal nextcloud absolute path for nodeExists
            //$file = $this->userFolder . $this->downloadDir . "/" . $filename;
            // $dir = $this->rootFolder->nodeExists($file) ? $this->downloadDir . "/" . $filename : $this->downloadDir;
            $file = $this->downloadDir . "/" . $filename;
            $params = ['dir' => $this->downloadDir];
            $fileInfo = Filesystem::getFileInfo($file);
            if ($fileInfo) {
                $fileType = $fileInfo->getType();
                if ($fileType === "dir") {
                    $params = ['dir' => $file];
                }
            }
            $folderLink = $this->urlGenerator->linkToRoute('files.view.index', $params);
            //$peers = ($this->getPeers($info['gid']));
            $completed = Helper::formatBytes($value['completedLength']);
            $percentage = $value['completedLength'] ? 100 * ($value['completedLength'] / $value['totalLength']) : 0;
            $completed = Helper::formatBytes($value['completedLength']);

            $total = Helper::formatBytes($value['totalLength']);

            $remaining = (int) $value['totalLength'] - (int) $value['completedLength'];
            $remaining = ($value['downloadSpeed'] > 0) ? ($remaining / $value['downloadSpeed']) : 0;
            $left = Helper::formatInterval($remaining);

            $numSeeders = $value['numSeeders'] ?? 0;
            $upload = $value['uploadLength'] ?? 0;
            $upload = Helper::formatBytes($upload);
            $extraInfo = "Seeders: $numSeeders|Up:$upload";
            // $numPeers = isset($peers['result']) ? count($peers['result']) : 0;
            $value['progress'] = array(sprintf("%s(%.2f%%)", $completed, $percentage), $extraInfo);
            $timestamp = $timestamp ?? 0;
            //$prefix = $value['files'][0]['path'];
            $tmp = [];
            $actions = [];
            $filename = sprintf('<a class="download-file-folder" href="%s">%s</a>', $folderLink, $filename);
            $fileInfo = sprintf('<button id="icon-clipboard" class="icon-clipboard" data-text="%s"></button> %s | %s', $extra ? $extra['link'] : 'nolink', $total, date("Y-m-d H:i:s", $timestamp));
            $tmp['filename'] = array($filename, $fileInfo);

            if ($this->aria2->methodName === "tellStopped") {
                $actions[] = $this->createActionItem('purge', 'purge');
            }
            if ($this->aria2->methodName === "tellWaiting") {
                $actions[] = $this->createActionItem('unpause', 'unpause');
                $actions[] = $this->createActionItem('delete', 'remove');
            }
            if ($this->aria2->methodName === "tellActive") {
                $speed = [Helper::formatBytes($value['downloadSpeed']), $left];
                $tmp['speed'] = $speed;
                $tmp['progress'] = $value['progress'];
                $actions[] = $this->createActionItem('pause', 'pause');
            }
            if (strtolower($value['status']) === 'error') {
                $tmp['status'] = $value['errorMessage'];
            } else if ($this->aria2->methodName !== "tellActive") {
                $tmp['status'] = $value['status'];
            }
            $tmp['data_gid'] = $value['gid'] ?? 0;
            $tmp['actions'] = $actions;
            //$tmp['actions'] = '';
            array_push($data['row'], $tmp);
        }
        if ($this->aria2->methodName === "tellActive") {
            $data['title'] = Helper::getTableTitles('active');
        } else {
            $data['title'] = Helper::getTableTitles();
        }
        return $data;
    }
    private function filterData($resp)
    {

        $data = [];
        if (empty($resp)) {
            return $data;
        }
        if (isset($resp['error'])) {
            return $resp;
        }

        $data = array_filter($resp, function ($value) {
            $gid = $value['following'] ?? $value['gid'];
            return (bool) ($this->dbconn->getUidByGid($gid) === $this->uid);
        });

        return $data;
    }
}
