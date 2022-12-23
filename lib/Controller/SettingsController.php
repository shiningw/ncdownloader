<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Db\Settings;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class SettingsController extends Controller
{
    /*@ OC\AppFramework\Http\Request*/
    //private $request;

    //@config OC\AppConfig
    private $config;
    public function __construct($AppName, IRequest $Request, $UserId) //, IL10N $L10N)

    {
        parent::__construct($AppName, $Request);
        $this->UserId = $UserId;
        //$this->L10N = $L10N;
        $this->settings = new Settings($UserId);
        //$this->config = \OC::$server->getAppConfig();
    }

    /**
     * @NoAdminRequired
     */
    public function getSettings()
    {
        $name = $this->request->getParam("name");
        $type = $this->request->getParam("type") ?? Settings::TYPE['USER'];
        $default = $this->request->getParam("default") ?? null;
        return new JSONResponse(Helper::getSettings($name, $default, $type));
    }

    /**
     * @NoAdminRequired
     */
    public function saveCustom()
    {
        $params = $this->request->getParams();
        foreach ($params as $key => $value) {
            $resp = $this->save($key, $value);
        }
        return new JSONResponse($resp);
    }

    /**
     * @NoAdminRequired
     */
    public function getCustomAria2()
    {
        $data = json_decode($this->settings->get("custom_aria2_settings"));
        return new JSONResponse($data);
    }

    public function saveAdmin()
    {
        $params = $this->request->getParams();
        $data =  $this->settings->setType(Settings::TYPE["SYSTEM"])->get("ncd_admin_settings", []);

        foreach ($params as $key => $value) {
            if (substr($key, 0, 1) == '_') {
                continue;
            }
            $data[$key] = $value;
        }
        $resp = $this->save("ncd_admin_settings", $data, Settings::TYPE["SYSTEM"]);

        return new JSONResponse($resp);
    }

    public function saveGlobalAria2()
    {
        $params = $this->request->getParams();
        $data = Helper::filterData($params, Helper::aria2Options());
        $resp = $this->save("global_aria2_config", $data, $this->settings::TYPE['SYSTEM']);

        return new JSONResponse($resp);
    }
    /**
     *
     */
    public function getGlobalAria2()
    {
        return new JSONResponse(Helper::getSettings("global_aria2_config", "", $this->settings::TYPE['SYSTEM']));
    }
    /**
     * @NoAdminRequired
     */
    public function saveCustomAria2()
    {
        $noAria2Settings = (bool) Helper::getAdminSettings("disallow_aria2_settings");
        if ($noAria2Settings && !\OC_User::isAdminUser($this->UserId)) {
            $resp = ["error" => "forbidden", "status" => false];
            return new JSONResponse($resp);
        }
        $params = $this->request->getParams();
        $data = Helper::filterData($params, Helper::aria2Options());
        $resp = $this->settings->save("custom_aria2_settings", json_encode($data));
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     */
    public function deleteCustomAria2()
    {
        $saved = json_decode($this->settings->get("custom_aria2_settings"), 1);
        $params = $this->request->getParams();
        $data = Helper::filterData($params, Helper::aria2Options());
        foreach ($data as $key => $value) {
            unset($saved[$key]);
        }
        $resp = $this->settings->save("custom_aria2_settings", json_encode($saved));
        return new JSONResponse($resp);
    }

    /**
     * @NoAdminRequired
     */
    public function getYtdl()
    {
        $data = json_decode($this->settings->get("custom_ytdl_settings"));
        return new JSONResponse($data);
    }
    /**
     * @NoAdminRequired
     */
    public function saveYtdl()
    {
        $params = $this->request->getParams();
        $data = array_filter($params, function ($key) {
            return (bool) (!in_array(substr($key, 0, 1), ['_']));
        }, ARRAY_FILTER_USE_KEY);
        $resp = $this->settings->save("custom_ytdl_settings", json_encode($data));
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     */
    public function deleteYtdl()
    {
        $saved = json_decode($this->settings->get("custom_ytdl_settings"), 1);
        $params = $this->request->getParams();
        foreach ($params as $key => $value) {
            unset($saved[$key]);
        }
        $resp = $this->settings->save("custom_ytdl_settings", json_encode($saved));
        return new JSONResponse($resp);
    }
    public function save($key, $value, $type = Settings::TYPE["USER"])
    {
        //key starting with _ is invalid
        if (substr($key, 0, 1) == '_') {
            return;
        }
        $key = Helper::sanitize($key);
        if (is_array($value)) {
            foreach ($value as $k => &$v) {
                $value[$k] = Helper::sanitize($v);
            }
        } else {
            $value = Helper::sanitize($value);
        }
        try {
            $this->settings->setType($type);
            $this->settings->save($key, $value);
        } catch (\Exception $e) {
            return ['error' => $e->getMessage(), "status" => false];
        }
        return ['message' => "Saved!", "status" => true];
    }
}
