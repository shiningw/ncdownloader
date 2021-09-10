<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OC_Util;

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
     * @NoCSRFRequired
     */
    public function personal()
    {
        $params = $this->request->getParams();
        foreach ($params as $key => $value) {
            if (substr($key, 0, 1) == '_') {
                continue;
            }
            $this->save($key, $value);
        }
    }
    public function aria2Get()
    {
        $data = json_decode($this->settings->get("custom_aria2_settings"));
        return new JSONResponse($data);
    }

    public function admin()
    {
        $this->settings->setType($this->settings::SYSTEM);
        $params = $this->request->getParams();
        foreach ($params as $key => $value) {
            if (substr($key, 0, 1) == '_') {
                continue;
            }
            $this->save($key, $value);
        }

    }
    public function aria2Save()
    {
        $params = $this->request->getParams();
        $data = Helper::filterData($params, Helper::aria2Options());
        $this->settings->save("custom_aria2_settings", json_encode($data));
    }
    public function aria2Delete()
    {
        $saved = json_decode($this->settings->get("custom_aria2_settings"),1);
        $params = $this->request->getParams();
        $data = Helper::filterData($params, Helper::aria2Options());
        foreach ($data as $key => $value) {
            unset($saved[$key]);
        }
        $this->settings->save("custom_aria2_settings", json_encode($saved));
        return new JSONResponse($saved);
    }
    public function save($key, $value)
    {
        $this->settings->save($key, $value);
    }

}
