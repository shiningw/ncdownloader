<?php

namespace OCA\NCDownloader\Tools;

use OC\AllConfig;

class Settings extends AllConfig
{
    //@config OC\AppConfig
    private $config;

    //@OC\SystemConfig
    private $sysConfig;

    //@OC\AllConfig
    private $allConfig;

    //type of settings (system = 1 or app =2)
    private $type;
    public const TYPE = ['SYSTEM' => 0x001, 'USER' => 0x010, 'APP' => 0x100];
    public function __construct($user = null)
    {
        $this->appConfig = \OC::$server->getAppConfig();
        $this->sysConfig = \OC::$server->getSystemConfig();
        $this->appName = 'ncdownloader';
        $this->type = self::TYPE['USER'];
        $this->user = $user;
        $this->allConfig = new AllConfig($this->sysConfig);
        //$this->connAdapter = \OC::$server->getDatabaseConnection();
        //$this->conn = $this->connAdapter->getInner();
    }
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }
    public function get($key, $default = null)
    {
        if ($this->type == self::TYPE['USER'] && isset($this->user)) {
            return $this->allConfig->getUserValue($this->user, $this->appName, $key, $default);
        } else if ($this->type == self::TYPE['SYSTEM']) {
            return $this->allConfig->getSystemValue($key, $default);
        } else {
            return $this->allConfig->getAppValue($this->appName, $key, $default);
        }
    }
    public function getAria2()
    {
        $settings = $this->allConfig->getUserValue($this->user, $this->appName, "custom_aria2_settings", '');
        return json_decode($settings, 1);
    }

    public function getYoutube()
    {
        $settings = $this->get("custom_youtube_dl_settings");
        return json_decode($settings, 1);
    }
    public function getAll()
    {
        if ($this->type === self::TYPE['APP']) {
            return $this->getAllAppValues();
        } else {
            $data = $this->getAllUserSettings();
            return $data;
        }

    }
    public function save($key, $value)
    {
        try {
            if ($this->type == self::TYPE['USER'] && isset($this->user)) {
                $this->allConfig->setUserValue($this->user, $this->appName, $key, $value);
            } else if ($this->type == self::TYPE['SYSTEM']) {
                $this->allConfig->setSystemValue($key, $value);
            } else {
                $this->allConfig->setAppValue($this->appName, $key, $value);
            }
        } catch (\Exception $e) {
            return ['error' => $e->getMessage];
        }
        return ['message' => "Saved!"];

    }
    public function getAllAppValues()
    {
        $keys = $this->getAllKeys();
        $value = [];
        foreach ($keys as $key) {
            $value[$key] = $this->allConfig->getAppValue($this->appName, $key);
        }
        return $value;
    }
    public function getAllKeys()
    {
        return $this->allConfig->getAppKeys($this->appName);
    }

    public function getAllUserSettings()
    {
        $keys = $this->allConfig->getUserKeys($this->user, $this->appName);
        $value = [];
        foreach ($keys as $key) {
            $value[$key] = $this->allConfig->getUserValue($this->user, $this->appName, $key);
        }
        return $value;
    }

}

class customSettings
{
    private $name = null;
    private $dbType = 0;
    private $table = 'ncdownloader_settings';
    private $uid = null;
    const PGSQL = 1, MYSQL = 2, SQL = 3;
    /* @var OC\DB\ConnectionAdapter */
    private $connAdapter;
    /* @var OC\DB\Connection */
    private $conn;
    private $type = 2; //personal = 2,admin =1

    public function __construct()
    {
        if (\OC::$server->getConfig()->getSystemValue('dbtype') == 'pgsql') {
            $this->dbType = PGSQL;
        }
        $this->connAdapter = \OC::$server->getDatabaseConnection();
        $this->conn = $this->connAdapter->getInner();

        $this->prefixTable();
    }

    private function prefixTable()
    {
        $this->table = '*PREFIX*' . $this->table;
        return $this->table;
    }

    public function set($name, $value)
    {
        if ($this->have($name)) {
            $this->update($name, $value);
        } else {
            $this->insert($name, $value);
        }
    }
    public function setType($type)
    {
        $this->type = $type;
    }

    public function get($name)
    {

        if (isset($this->uid)) {
            $sql = sprintf("SELECT value FROM %s WHERE uid = ? AND name = ? LIMIT 1", $this->table);
            $query = \OC_DB::prepare($sql);
            $result = $query->execute(array($this->uid, $name));
        } else {
            $sql = sprintf("SELECT value FROM %s WHERE name = ? LIMIT 1", $this->table);
            $query = \OC_DB::prepare($sql);
            $result = $query->execute(array($name));
        }
        if ($query->rowCount() == 1) {
            return $result->fetchOne();
        }
        return null;
    }

    public function setUID($uid)
    {
        $this->uid = $uid;
    }

    public function setTable($table)
    {
        $this->table = $table;
    }
    public function getTable()
    {
        return $this->table;
    }

    public function have($name)
    {
        if (isset($this->uid)) {
            $sql = sprintf("SELECT value FROM %s WHERE uid = ? AND name = ? AND type = ? LIMIT 1", $this->table);
            $query = \OC_DB::prepare($sql);
            $query->execute(array($name, $this->uid, $this->type));
        } else {
            $sql = sprintf("SELECT value FROM %s WHERE name = ? AND type = ? LIMIT 1", $this->table);
            $query = \OC_DB::prepare($sql);
            $query->execute(array($name, $this->type));
        }

        if ($query->rowCount() == 1) {
            return true;
        }
        return false;
    }

    public function getAll()
    {
        $sql = 'SELECT `name`, `value` FROM `*PREFIX*' . $this->table . '`'
            . (!is_null($this->uid) ? ' WHERE `UID` = ?' : '');
        if ($this->DbType == 1) {
            $sql = 'SELECT "name", "value" FROM *PREFIX*' . $this->table . ''
                . (!is_null($this->uid) ? ' WHERE "uid" = ?' : '');
        }
        $query = \OC_DB::prepare($sql);

        if (!is_null($this->uid)) {
            return $query->execute(array($this->uid));
        } else {
            return $query->execute();
        }
    }

    public function update($value)
    {
        if (isset($this->uid)) {
            $sql = sprintf("UPDATE %s SET value = ? WHERE name = ? AND type = ? AND uid = ?", $this->table);
            //OCP\DB\IPreparedStatement
            $query = \OC_DB::prepare($sql);
            $query->execute(array($value, $name, $this->type, $this->uid));
        } else {
            $sql = sprintf("UPDATE %s SET value = ? WHERE name = ? AND type = ?", $this->table);
            //OCP\DB\IPreparedStatement
            $query = \OC_DB::prepare($sql);
            $query->execute(array($value, $name, $this->type));
        }

    }

    public function insert($name, $value)
    {
        $sql = sprintf("INSERT INTO %s (name,value,type,uid) VALUES(?,?,?,?)", $this->table);
        //OCP\DB\IPreparedStatement
        $query = \OC_DB::prepare($sql);
        $query->execute(array($name, $value, $this->type, $this->uid));

    }
}
