<?php

namespace OCA\NCDownloader\Tools;

use OC\AllConfig;

class Settings extends AllConfig
{
    //@config OC\AppConfig
    private $appConfig;

    //@OC\SystemConfig
    private $sysConfig;

    //@OC\AllConfig
    private $allConfig;
    private $user;
    private $appName;
    //type of settings (system = 1 or app =2)
    private $type;
    private static $instance = null;
    public const TYPE = ['SYSTEM' => 1, 'USER' => 2, 'APP' => 3];
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
    public static function create($user = null)
    {

        if (!self::$instance) {
            self::$instance = new static($user);
        }
        return self::$instance;
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
