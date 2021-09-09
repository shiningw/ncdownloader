<?php

namespace OCA\NcDownloader\AppInfo;

use OCA\NcDownloader\Controller\MainController;
use OCA\NcDownloader\Controller\Aria2Controller;
use OCA\NcDownloader\Tools\Aria2;
use OCA\NcDownloader\Tools\Settings;
use OCP\AppFramework\App;
use OCP\IContainer;
use \OC\Files\Filesystem;

class Application extends App
{
    public function __construct(array $urlParams = array())
    {
        parent::__construct('ncdownloader', $urlParams);
        $container = $this->getContainer();
        $container->registerService('UserId', function (IContainer $container) {
            $user = \OC::$server->getUserSession()->getUser();
            return ($user) ? $user->getUID() : '';
        });

        $container->registerService('Aria2', function (IContainer $container) {
            $uid = $container->query('UserId');
            return new Aria2($this->getConfig($uid));
        });

        $container->registerService('Settings', function (IContainer $container) {
            $uid = $container->query('UserId');
            return new Settings($uid);
        });

        $container->registerService('MainController', function (IContainer $container) {
            return new MainController(
                $container->query('AppName'),
                $container->query('Request'),
                $container->query('UserId'),
                \OC::$server->getL10N('ncdownloader'),
                \OC::$server->getRootFolder(),
                $container->query('Aria2')
            );
        });

        $container->registerService('Aria2Controller', function (IContainer $container) {
            return new Aria2Controller(
                $container->query('AppName'),
                $container->query('Request'),
                $container->query('UserId'),
                \OC::$server->getL10N('ncdownloader'),
                \OC::$server->getRootFolder(),
                $container->query('Aria2')
            );
        });
    }

    private function getConfig($uid)
    {
        //$this->config = \OC::$server->getAppConfig();
        $this->settings = new Settings($uid);
        $this->userFolder = Filesystem::getRoot();
        $this->dataDir = \OC::$server->getSystemConfig()->getValue('datadirectory');
        //relative nextcloud user path
        $this->downloadDir = $this->settings->get('ncd_downloader_dir') ?? "/Downloads";
        $this->torrentsDir = $this->settings->get('torrents_dir');
        //get the absolute path
        $this->realDownloadDir = $this->dataDir . $this->userFolder . $this->downloadDir;
        $aria2_dir = $this->dataDir . "/aria2";
        $this->appPath = \OC::$server->getAppManager()->getAppPath('ncdownloader');
        $settings['seed_time'] = $this->settings->get("ncd_seed_time");
        $settings['seed_ratio'] = $this->settings->get("ncd_seed_ratio");
        if (is_array($customSettings = $this->settings->getAria2())) {
            $settings = array_merge($customSettings, $settings);
        }
        $token = $this->settings->setType(1)->get('ncd_rpctoken');
        $config = ['dir' => $this->realDownloadDir, 'conf_dir' => $aria2_dir, 'token' => $token, 'settings' => $settings];
        return $config;
    }

}
