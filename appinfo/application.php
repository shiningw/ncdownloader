<?php

namespace OCA\NCDownloader\AppInfo;

use OCA\NCDownloader\Controller\Aria2Controller;
use OCA\NCDownloader\Controller\MainController;
use OCA\NCDownloader\Controller\YtdlController;
use OCA\NCDownloader\Aria2\Aria2;
use OCA\NCDownloader\Http\Client;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Db\Settings;
use OCA\NCDownloader\Ytdl\Ytdl;
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
            $config = Helper::getAria2Config($this->uid);
            return new Aria2($config);
        });

        $container->registerService('Ytdl', function (IContainer $container) {
            $config = Helper::getYtdlConfig($this->uid);
            return new Ytdl($config);
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
                $container->query('Ytdl')
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
        $container->registerService('YtdlController', function (IContainer $container) {
            return new YtdlController(
                $container->query('AppName'),
                $container->query('Request'),
                $container->query('UserId'),
                \OC::$server->getL10N('ncdownloader'),
                $container->query('Aria2'),
                $container->query('Ytdl')
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
