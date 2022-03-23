<?php
namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\DbHelper;
use OCA\NCDownloader\Tools\folderScan;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OCA\NCDownloader\Tools\Youtube;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IL10N;
use OCP\IRequest;

class YoutubeController extends Controller
{
    private $userId;
    private $settings = null;
    //@config OC\AppConfig
    private $l10n;
    private $audio_extensions = array("mp3", "m4a", "vorbis");

    public function __construct($appName, IRequest $request, $UserId, IL10N $IL10N, Aria2 $aria2, Youtube $youtube)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->urlGenerator = \OC::$server->getURLGenerator();
        $this->l10n = $IL10N;
        $this->settings = new Settings($UserId);
        $this->downloadDir = $this->settings->get('ncd_downloader_dir') ?? "/Downloads";
        $this->dbconn = new DbHelper();
        $this->youtube = $youtube;
        $this->aria2 = $aria2;
        $this->aria2->init();
        $this->tablename = $this->dbconn->queryBuilder->getTableName("ncdownloader_info");
    }
    /**
     * @NoAdminRequired
     *
     */
    public function Index()
    {
        $data = $this->dbconn->getYoutubeByUid($this->uid);
        if (is_array($data) && count($data) < 1) {
            return [];
        }
        $resp['title'] = [];
        $resp['row'] = [];
        $params = ['dir' => $this->downloadDir];
        $folderLink = $this->urlGenerator->linkToRoute('files.view.index', $params);
        foreach ($data as $value) {
            $tmp = [];
            $extra = $this->dbconn->getExtra($value["data"]);
            $filename = sprintf('<a class="download-file-folder" href="%s">%s</a>', $folderLink, $value['filename']);
            $fileInfo = sprintf('<div class="ncd-file-info"><button id="icon-clipboard" class="icon-clipboard" data-text="%s"></button> %s | % s</div>', $extra['link'], $value['filesize'], date("Y-m-d H:i:s", $value['timestamp']));
            $tmp['filename'] = array($filename, $fileInfo);
            $tmp['speed'] = explode("|", $value['speed']);
            $tmp['progress'] = $value['progress'];

            $path = $this->urlGenerator->linkToRoute('ncdownloader.Youtube.Delete');
            $tmp['actions'][] = ['name' => 'delete', 'path' => $path];
            $path = $this->urlGenerator->linkToRoute('ncdownloader.Youtube.Redownload');
            $tmp['actions'][] = ['name' => 'refresh', 'path' => $path];

            $tmp['data_gid'] = $value['gid'] ?? 0;
            array_push($resp['row'], $tmp);
        }

        $resp['title'] = ['filename', 'speed', 'progress', 'actions'];
        $resp['counter'] = ['youtube-dl' => count($data)];
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Download()
    {
        $params = array();
        $url = trim($this->request->getParam('text-input-value'));
        $yt = $this->youtube;
        if (in_array($this->request->getParam('extension'), $this->audio_extensions)) {
            $yt->audioOnly = TRUE;
            $yt->audioFormat = $this->request->getParam('extension');
        } else {
            $yt->audioOnly = FALSE;
            $yt->videoFormat = $this->request->getParam('extension');
        }
        if (!$yt->isInstalled()) {
            return new JSONResponse(["error" => "Please install the latest youtube-dl or make the bundled binary file executable in ncdownloader/bin"]);
        }
        if (Helper::isGetUrlSite($url)) {
            return new JSONResponse($this->downloadUrlSite($url));
        }

        $resp = $yt->forceIPV4()->download($url);
        folderScan::sync();
        return new JSONResponse($resp);
    }
    private function downloadUrlSite($url)
    {
        $yt = $this->youtube;
        if ($data = $yt->forceIPV4()->getDownloadUrl($url)) {
            return $this->_download($data['url'], $data['filename']);
        } else {
            return ['error' => $this->l10n->t("failed to get any url!")];
        }
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Delete()
    {
        $gid = $this->request->getParam('gid');
        if (!$gid) {
            return new JSONResponse(['error' => "no gid value is received!"]);
        }

        $row = $this->dbconn->getByGid($gid);
        $data = $this->dbconn->getExtra($value["data"]);;
        if (!isset($data['pid'])) {
            if ($this->dbconn->deleteByGid($gid)) {
                $msg = sprintf("%s is deleted from database!", $gid);
            }
            return new JSONResponse(['message' => $msg]);
        }
        $pid = $data['pid'];
        if (!Helper::isRunning($pid)) {
            if ($this->dbconn->deleteByGid($gid)) {
                $msg = sprintf("%s is deleted from database!", $gid);
            } else {
                $msg = sprintf("process %d is not running!", $pid);
            }
        } else {
            if (Helper::stop($pid)) {
                $msg = sprintf("process %d has been terminated!", $pid);
            } else {
                $msg = sprintf("failed to terminate process %d!", $pid);
            }
            $this->dbconn->deleteByGid($gid);
        }
        return new JSONResponse(['message' => $msg]);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function Redownload()
    {
        $gid = $this->request->getParam('gid');
        if (!$gid) {
            return new JSONResponse(['error' => "no gid value is received!"]);
        }
        $row = $this->dbconn->getByGid($gid);
        $data = $this->dbconn->getExtra($row["data"]);
        if (!empty($data['link'])) {
            if (isset($data['ext'])) {
                if (in_array($data['ext'], $this->audio_extensions)) {
                    $this->youtube->audioOnly = TRUE;
                    $this->youtube->audioFormat = $data['ext'];
                } else {
                    $this->youtube->audioOnly = FALSE;
                    $this->youtube->videoFormat = $data['ext'];
                }
            }
            //$this->dbconn->deleteByGid($gid);
            $resp = $this->youtube->forceIPV4()->download($data['link']);
            folderScan::sync();
            return new JSONResponse($resp);
        }
        return new JSONResponse(['error' => "no link"]);
    }

    private function _download($url, $filename = null)
    {
        if (!$filename) {
            $filename = Helper::getFileName($url);
        }
        $this->aria2->setFileName($filename);

        $result = $this->aria2->download($url);
        if (!$result) {
            return ['error' => 'failed to download the file for some reason!'];
        }
        if (isset($result['error'])) {
            return $result;
        }

        $data = [
            'uid' => $this->uid,
            'gid' => $result,
            'type' => 1,
            'filename' => $filename ?? 'unknown',
            'timestamp' => time(),
            'data' => serialize(['link' => $url]),
        ];
        $this->dbconn->save($data);
        $resp = ['message' => $filename, 'result' => $result];
        return $resp;
    }

    private function installYTD()
    {
        try {
            $filename = Helper::getFileName($yt->installUrl());
            $yt->setDownloadDir($this->dataDir . "/bin");
            $resp = $this->Save($yt->installUrl(), $filename);
            return $resp;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }

        return ['error' => $this->l10n->t("Youtube-dl NOT installed!")];
    }

}
