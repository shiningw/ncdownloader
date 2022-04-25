<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
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
     * @NoCSRFRequired
     */
    public function personal()
    {
        $params = $this->request->getParams();
        foreach ($params as $key => $value) {
            $resp = $this->save($key, $value);
        }
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function aria2Get()
    {
        $data = json_decode($this->settings->get("custom_aria2_settings"));
        return new JSONResponse($data);
    }

    public function admin()
    {
        $this->settings->setType($this->settings::TYPE['SYSTEM']);
        $params = $this->request->getParams();

        foreach ($params as $key => $value) {
            $resp = $this->save($key, $value);
        }
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function aria2Save()
    {
        $params = $this->request->getParams();
        $data = Helper::filterData($params, Helper::aria2Options());
        $resp = $this->settings->save("custom_aria2_settings", json_encode($data));
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function aria2Delete()
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
     * @NoCSRFRequired
     */
    public function youtubeGet()
    {
        $data = json_decode($this->settings->get("custom_youtube_dl_settings"));
        return new JSONResponse($data);
    }

    public function youtubeSave()
    {
        $params = $this->request->getParams();
        $data = array_filter($params, function ($key) {
            return (bool) (!in_array(substr($key, 0, 1), ['_']));
        }, ARRAY_FILTER_USE_KEY);
        $resp = $this->settings->save("custom_youtube_dl_settings", json_encode($data));
        return new JSONResponse($resp);
    }
    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function youtubeDelete()
    {
        $saved = json_decode($this->settings->get("custom_youtube_dl_settings"), 1);
        $params = $this->request->getParams();
        foreach ($params as $key => $value) {
            unset($saved[$key]);
        }
        $resp = $this->settings->save("custom_youtube_dl_settings", json_encode($saved));
        return new JSONResponse($resp);
    }
    public function save($key, $value)
    {
        //key starting with _ is invalid
        if (substr($key, 0, 1) == '_') {
            return;
        }
        $key = Helper::sanitize($key);
        $value = Helper::sanitize($value);
        try {
            $this->settings->save($key, $value);
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
        return ['message' => "Saved!"];
    }
}
