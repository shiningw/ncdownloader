<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\DbHelper;
use OCA\NCDownloader\Tools\Helper;

class YoutubeHelper
{
    public $file = null;
    protected $pid = 0;
    public function __construct()
    {
        $this->dbconn = new DbHelper();
        $this->tablename = $this->dbconn->queryBuilder->getTableName("ncdownloader_info");
        $this->user = \OC::$server->getUserSession()->getUser()->getUID();
    }

    public static function create()
    {

        return new static();
    }
    public function getDownloadInfo(string $output): ?array
    {
        $rules = '#\[(?<module>(download|ExtractAudio|VideoConvertor|Merger|ffmpeg))\]((\s+|\s+Converting.*;\s+)Destination:\s+|\s+Merging formats into\s+\")' .
            '(?<filename>.*\.(?<ext>(mp4|mp3|aac|webm|m4a|ogg|3gp|mkv|wav|flv)))#i';

        if (preg_match($rules, $output, $matches)) {
            return $matches;
        }
        return null;
    }

    public function getSiteInfo(string $buffer): ?array
    {
        $regex = '/\[(?<site>.+)]\s(?<id>.+):\sDownloading\s.*/i';
        if (preg_match($regex, $buffer, $matches)) {
            return ["id" => $matches["id"], "site" => $matches["site"]];
        }
        return null;
    }

    public function getProgress(string $buffer): ?array
    {
        $progressRegex = '#\[download\]\s+' .
        '(?<percentage>\d+(?:\.\d+)?%)' . //progress
        '\s+of\s+[~]?' .
        '(?<filesize>\d+(?:\.\d+)?(?:K|M|G)iB)' . //file size
        '(?:\s+at\s+' .
        '(?<speed>(\d+(?:\.\d+)?(?:K|M|G)iB/s)|Unknown speed))' . //speed
        '(?:\s+ETA\s+(?<eta>([\d:]{2,8}|Unknown ETA)))?' . //estimated download time
        '(\s+in\s+(?<totalTime>[\d:]{2,8}))?#i';

        if (preg_match_all($progressRegex, $buffer, $matches, PREG_SET_ORDER) !== false) {
            if (count($matches) > 0) {
                return reset($matches);
            }
        }
        return null;
    }

    protected function updateProgress(array $data)
    {
        extract($data);
        $sql = sprintf("UPDATE %s set filesize = ?,speed = ?,progress = ? WHERE gid = ?", $this->tablename);
        $this->dbconn->executeUpdate($sql, [$filesize, $speed, $percentage, $this->gid]);
    }
    public function log($message)
    {
        Helper::debug($message);
    }
    public function updateStatus($status = null)
    {
        if (isset($status)) {
            $this->status = trim($status);
        }
        $this->dbconn->updateStatus($this->gid, $this->status);
    }
    public function setPid($pid)
    {
        $this->pid = $pid;
    }
    public function run(string $buffer, array $extra)
    {
        $info = $this->getSiteInfo($buffer);
        if (isset($info["id"])) {
            $this->gid = Helper::generateGID($info["id"]);
        }
        if (!$this->gid) {
            $this->gid = Helper::generateGID($extra["link"]);
        }
        $downloadInfo = $this->getDownloadInfo($buffer);
        if ($downloadInfo) {
            $file = $downloadInfo["filename"];
            $module = $downloadInfo["module"];
            $this->file = basename($file);
            if (strtolower($module) == "download") {
                $this->save($file, $extra);
            } else {
                $this->updateFilename($file);
            }
        }
        if ($progress = $this->getProgress($buffer)) {
            $this->updateProgress($progress);
        }
    }
    protected function save(string $file, array $extra)
    {
        $data = [];
        $extra = serialize($extra);
        if ($this->dbconn->getDBType() == "pgsql") {
            if (function_exists("pg_escape_bytea")) {
                $extra = pg_escape_bytea($extra);
            }
        }
        $data = [
            'uid' => $this->user,
            'gid' => $this->gid,
            'type' => Helper::DOWNLOADTYPE['YOUTUBE-DL'],
            'filename' => basename($file),
            'status' => Helper::STATUS['ACTIVE'],
            'timestamp' => time(),
            'data' => $extra,
        ];
        $this->dbconn->insert($data);
    }
    private function updateFilename(string $file)
    {
        $sql = sprintf("UPDATE %s set filename = ? WHERE gid = ?", $this->tablename);
        $this->dbconn->executeUpdate($sql, [basename($file), $this->gid]);
    }
}
