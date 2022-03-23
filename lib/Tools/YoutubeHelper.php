<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\DbHelper;
use OCA\NCDownloader\Tools\Helper;

class YoutubeHelper
{
    public const PROGRESS_PATTERN = '#\[download\]\s+' .
    '(?<percentage>\d+(?:\.\d+)?%)' . //progress
    '\s+of\s+[~]?' .
    '(?<size>\d+(?:\.\d+)?(?:K|M|G)iB)' . //file size
    '(?:\s+at\s+' .
    '(?<speed>(\d+(?:\.\d+)?(?:K|M|G)iB/s)|Unknown speed))' . //speed
    '(?:\s+ETA\s+(?<eta>([\d:]{2,8}|Unknown ETA)))?' . //estimated download time
    '(\s+in\s+(?<totalTime>[\d:]{2,8}))?#i';
    public $file = null;
    public $filesize = null;
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
    public function getFilePath($output)
    {
        $rules = '#\[(download|ExtractAudio|VideoConvertor|Merger)\]((\s+|\s+Converting.*;\s+)Destination:\s+|\s+Merging formats into\s+\")' .
        '(?<filename>.*\.(?<ext>(mp4|mp3|aac|webm|m4a|ogg|3gp|mkv|wav|flv)))#i';

        preg_match($rules, $output, $matches);

        return $matches['filename'] ?? null;
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
        //$sql = sprintf("UPDATE %s set status = ? WHERE gid = ?", $this->tablename);
        $this->dbconn->updateStatus($this->gid, $this->status);
    }
    public function setPid($pid)
    {
        $this->pid = $pid;
    }
    public function run($buffer, $extra)
    {
        $this->gid = Helper::generateGID($extra['link']);
        $file = $this->getFilePath($buffer);
        if ($file) {
            $extra = serialize($extra);
            if($this->dbconn->getDBType() == "pgsql"){
                $extra = pg_escape_bytea($extra);
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
            if (isset($this->file)) {
                $sql = sprintf("UPDATE %s set filename = ? WHERE gid = ?", $this->tablename);
                $this->dbconn->executeUpdate($sql, [basename($file), $this->gid]);
            } else {
                $this->dbconn->insert($data);
            }
            //save the filename as this runs only once
            $this->file = basename($file);
            //$this->dbconn->save($data,[],['gid' => $this->gid]);
        }
        if (preg_match_all(self::PROGRESS_PATTERN, $buffer, $matches, PREG_SET_ORDER) !== false) {
            if (count($matches) > 0) {
                $match = reset($matches);

                //save the filesize
                if (!isset($this->filesize) && isset($match['size'])) {
                    $this->filesize = $match['size'];
                }
                $size = $match['size'];
                $percentage = $match['percentage'];
                $speed = $match['speed'] . "|" . $match['eta'];
                $sql = sprintf("UPDATE %s set filesize = ?,speed = ?,progress = ? WHERE gid = ?", $this->tablename);
                $this->dbconn->executeUpdate($sql, [$this->filesize, $speed, $percentage, $this->gid]);
                /* $data = [
            'filesize' => $size,
            'speed' => $speed,
            'progress' => $percentage,
            'gid' => $this->gid,
            ];
            $this->dbconn->save([], $data, ['gid' => $this->gid]);*/
            }
        }
    }
}
