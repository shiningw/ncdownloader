<?php

namespace OCA\NCDownloader\AppInfo;

use OCA\NCDownloader\Aria2\Aria2;
use OCA\NCDownloader\Http\Client;
use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Db\Settings;
use OCA\NCDownloader\Ytdl\Ytdl;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use Symfony\Component\DomCrawler\Crawler;
use Psr\Container\ContainerInterface;

class Application extends App implements IBootstrap
{
    public function __construct(array $urlParams = array())
    {
        parent::__construct('ncdownloader', $urlParams);
    }
    public function register(IRegistrationContext $context): void
    {
        $context->registerService(Client::class, function () {
            $options = [
                'ipv4' => true,
            ];
            return Client::create($options);
        });
        $context->registerService(Crawler::class, function () {
            return new Crawler();
        });
        $sites = Helper::getSearchSites();
        foreach ($sites as $site) {
            //fully qualified class name
            $className = $site['class'];
            $context->registerService($className, function (ContainerInterface $container) use ($className) {
                $crawler = $container->get(Crawler::class);
                $client = $container->get(Client::class);
                return $className::create($crawler, $client);
            });
        }
    }

    public function boot(IBootContext $c): void
    {
        $user = Helper::getUser();
        $uid = ($user) ? $user->getUID() : '';
        //$settings = new Settings($uid);
        //$userFolder = Helper::getUserFolder($uid);
        $context = $c->getAppContainer();

        $context->registerService(Aria2::class, function (ContainerInterface $c) use ($uid) {
            $config = Helper::getAria2Config($uid);
            return new Aria2($config);
        });
        $context->registerService(Ytdl::class, function (ContainerInterface $c) use ($uid) {
            $config = Helper::getYtdlConfig($uid);
            return new Ytdl($config);
        });

        $context->registerService(Settings::class, function (ContainerInterface $c) use ($uid) {
            return new Settings($uid);
        });
        $context->registerService('uid', function (ContainerInterface $c) use ($uid) {
            return $uid;
        });
        //$context->injectFn([$this, 'registerSearchProviders']);
    }
}
