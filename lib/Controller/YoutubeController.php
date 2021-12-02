<?php
namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\DBConn;
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

    public function __construct($appName, IRequest $request, $UserId, IL10N $IL10N, Aria2 $aria2, Youtube $youtube)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->urlGenerator = \OC::$server->getURLGenerator();
        $this->l10n = $IL10N;
        $this->settings = new Settings($UserId);
        $this->downloadDir = $this->settings->get('ncd_downloader_dir') ?? "/Downloads";
        $this->dbconn = new DBConn();
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
            $filename = sprintf('<a class="download-file-folder" href="%s">%s</a>', $folderLink, $value['filename']);
            $fileInfo = sprintf("%s | %s", $value['filesize'], date("Y-m-d H:i:s", $value['timestamp']));
            $tmp['filename'] = array($filename, $fileInfo);
            $tmp['speed'] = explode("|", $value['speed']);
            $tmp['progress'] = $value['progress'];
            if ((int) $value['status'] == Helper::STATUS['COMPLETE']) {
                $path = $this->urlGenerator->linkToRoute('ncdownloader.Youtube.Delete');
                $tmp['actions'][] = ['name' => 'delete', 'path' => $path];
            } else {
                $path = $this->urlGenerator->linkToRoute('ncdownloader.Youtube.Redownload');
                $tmp['actions'][] = ['name' => 'refresh', 'path' => $path];
            }
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
        $yt->audioOnly = (bool) $this->request->getParam('audio-only');
        if (!$yt->isInstalled()) {
            return new JSONResponse(["error" => "Youtube-dl is not installed!"]);
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

        if ($this->dbconn->deleteByGid($gid)) {
            return new JSONResponse(['message' => $gid . " Deleted!"]);

        }
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
        $data = unserialize($row['data']);
        if (!empty($data['link'])) {
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
