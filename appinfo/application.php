<?php

namespace OCA\NCDownloader\AppInfo;

use OCA\NCDownloader\Controller\Aria2Controller;
use OCA\NCDownloader\Controller\MainController;
use OCA\NCDownloader\Controller\YoutubeController;
use OCA\NCDownloader\Search\Sites\bitSearch;
use OCA\NCDownloader\Search\Sites\TPB;
use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OCA\NCDownloader\Tools\Youtube;
use OCP\AppFramework\App;
use OCP\IContainer;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

class Application extends App
{
    public function __construct(array $urlParams = array())
    {
        parent::__construct('ncdownloader', $urlParams);
        $user = \OC::$server->getUserSession()->getUser();
        $this->uid = ($user) ? $user->getUID() : '';
        $this->settings = new Settings($this->uid);
        $this->dataDir = \OC::$server->getSystemConfig()->getValue('datadirectory');
        $this->userFolder = Helper::getUserFolder($this->uid);
        $container = $this->getContainer();
        $container->registerService('UserId', function (IContainer $container) {
            return $this->uid;
        });

        $container->registerService('Aria2', function (IContainer $container) {
            return new Aria2($this->getConfig());
        });

        $container->registerService('Youtube', function (IContainer $container) {
            return new Youtube(['downloadDir' => $this->getRealDownloadDir()]);
        });

        $container->registerService('Settings', function (IContainer $container) {
            return new Settings($this->uid);
        });

        $container->registerService('MainController', function (IContainer $container) {
            return new MainController(
                $container->query('AppName'),
                $container->query('Request'),
                $container->query('UserId'),
                \OC::$server->getL10N('ncdownloader'),
                //\OC::$server->getRootFolder(),
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
        $container->registerService('YoutubeController', function (IContainer $container) {
            return new YoutubeController(
                $container->query('AppName'),
                $container->query('Request'),
                $container->query('UserId'),
                \OC::$server->getL10N('ncdownloader'),
                $container->query('Aria2'),
                $container->query('Youtube')
            );
        });
        $container->registerService('crawler', function () {
            return new Crawler();
        });
        $container->registerService('httpClient', function () {
            return HttpClient::create();
        });
        $container->registerService(TPB::class, function (IContainer $container) {
            $crawler = $container->query('crawler');
            $client = $container->query('httpClient');
            return new TPB($crawler, $client);
        });
        $container->registerService(bitSearch::class, function (IContainer $container) {
            $crawler = $container->query('crawler');
            $client = $container->query('httpClient');
            return new bitSearch($crawler, $client);
        });
    }

    private function getRealDownloadDir()
    {

        //relative nextcloud user path
        $dir = $this->settings->get('ncd_downloader_dir') ?? "/Downloads";
        return $this->dataDir . $this->userFolder . $dir;
    }

    private function getConfig()
    {
        //$this->config = \OC::$server->getAppConfig();
        $realDownloadDir = $this->getRealDownloadDir();
        $this->torrentsDir = $this->settings->get('torrents_dir');
        $aria2_dir = $this->dataDir . "/aria2";
        //$this->appPath = \OC::$server->getAppManager()->getAppPath('ncdownloader');
        $settings['seed_time'] = $this->settings->get("ncd_seed_time");
        $settings['seed_ratio'] = $this->settings->get("ncd_seed_ratio");
        if (is_array($customSettings = $this->settings->getAria2())) {
            $settings = array_merge($customSettings, $settings);
        }
        $token = $this->settings->setType(1)->get('ncd_rpctoken');
        $config = ['dir' => $realDownloadDir, 'conf_dir' => $aria2_dir, 'token' => $token, 'settings' => $settings];
        return $config;
    }

}
