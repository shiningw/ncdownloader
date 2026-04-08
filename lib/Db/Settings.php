<?php

namespace OCA\NCDownloader\Db;

use OCP\IConfig;

class Settings
{
    //@config OC\AppConfig
    private $appConfig;

    //@OC\SystemConfig
    private $sysConfig;

    //@OCP\IConfig
    private $config;
    private $user;
    private $appName;
    //type of settings (system = 1 or app =2)
    private $type;
    private static $instance = null;
    public const TYPE = ['SYSTEM' => 1, 'USER' => 2, 'APP' => 3];
    public function __construct($user = null)
    {
        $this->config = \OC::$server->get(IConfig::class);
        $this->appName = 'ncdownloader';
        $this->type = self::TYPE['USER'];
        $this->user = $user;
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
            return $this->config->getUserValue($this->user, $this->appName, $key, $default);
        } else if ($this->type == self::TYPE['SYSTEM']) {
            return $this->config->getSystemValue($key, $default);
        } else {
            return $this->config->getAppValue($this->appName, $key, $default);
        }
    }
    public function getAria2()
    {
        $settings = $this->config->getUserValue($this->user, $this->appName, "custom_aria2_settings", '');
        return json_decode($settings, 1);
    }

    public function getYtdl()
    {
        $settings = $this->get("custom_ytdl_settings");
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
                $this->config->setUserValue($this->user, $this->appName, $key, $value);
            } else if ($this->type == self::TYPE['SYSTEM']) {
                $this->config->setSystemValue($key, $value);
            } else {
                $this->config->setAppValue($this->appName, $key, $value);
            }
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
        return ['message' => "Saved!"];

    }
    public function getAllAppValues()
    {
        $keys = $this->getAllKeys();
        $value = [];
        foreach ($keys as $key) {
            $value[$key] = $this->config->getAppValue($this->appName, $key);
        }
        return $value;
    }
    public function getAllKeys()
    {
        return $this->config->getAppKeys($this->appName);
    }

    public function getAllUserSettings()
    {
        $keys = $this->config->getUserKeys($this->user, $this->appName);
        $value = [];
        foreach ($keys as $key) {
            $value[$key] = $this->config->getUserValue($this->user, $this->appName, $key);
        }
        return $value;
    }
}
