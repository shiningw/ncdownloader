<?php

namespace OCA\NCDownloader\AppInfo;

use OCA\NCDownloader\Controller\Aria2Controller;
use OCA\NCDownloader\Controller\MainController;
use OCA\NCDownloader\Controller\YoutubeController;
use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\Client;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OCA\NCDownloader\Tools\Youtube;
use OCP\AppFramework\App;
use OCP\IContainer;
use Symfony\Component\DomCrawler\Crawler;

class Application extends App
{
    public function __construct(array $urlParams = array())
    {
        parent::__construct('ncdownloader', $urlParams);
        $user = Helper::getUser();
        $this->uid = ($user) ? $user->getUID() : '';
        $this->settings = new Settings($this->uid);
        $this->userFolder = Helper::getUserFolder($this->uid);
        $container = $this->getContainer();
        $container->registerService('UserId', function (IContainer $container) {
            return $this->uid;
        });

        $container->registerService('Aria2', function (IContainer $container) {
            return new Aria2(Helper::getAria2Config($this->uid));
        });

        $container->registerService('Youtube', function (IContainer $container) {
            $config = Helper::getYoutubeConfig($this->uid);
            return new Youtube($config);
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
                $container->query('Aria2'),
                $container->query('Youtube')
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
        $container->registerService('httpClient', function () {
            $options = [
                'ipv4' => true,
            ];
            return Client::create($options);
        });
        $container->registerService('crawler', function () {
            return new Crawler();
        });
        $sites = Helper::getSearchSites();
        foreach ($sites as $site) {
            //fully qualified class name
            $className = $site['class'];
            $container->registerService($className, function (IContainer $container) use ($className) {
                $crawler = $container->query('crawler');
                $client = $container->query('httpClient');
                return $className::create($crawler, $client);
            });
        }
    }

}
