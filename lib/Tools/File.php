<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OC\Files\Utils\Scanner;
use \OCP\EventDispatcher\IEventDispatcher;

class File
{
    public static function syncFolder($dir = null)
    {
        $user = \OC::$server->getUserSession()->getUser()->getUID();
        if (!isset($dir)) {
            $settings = new Settings($user);
            $downloadDir = $settings->get('ncd_downloader_dir') ?? "/Downloads";
            $rootFolder = Helper::getUserFolder($user);
            $path = $rootFolder . "/" . ltrim($downloadDir, '/\\');
        } else {
            $path = $dir;
        }

        $realDir =\OC::$server->getSystemConfig()->getValue('datadirectory') . "/" . $path;
        if (!(Helper::folderUpdated($realDir))) {
            return ['message' => "no change"];
        }
        $logger = \OC::$server->getLogger();
        $scanner = new Scanner($user, \OC::$server->getDatabaseConnection(), \OC::$server->query(IEventDispatcher::class), $logger);
        try {
            $scanner->scan($path);
            // Helper::debug($logger->getLogPath());
            //$logger->warning($logger->getLogPath(),['app' =>'Ncdownloader']);
        } catch (ForbiddenException $e) {
            $logger->warning("Make sure you're running the scan command only as the user the web server runs as");
        } catch (\Exception $e) {

            $logger->warning("Exception during scan: " . $e->getMessage() . $e->getTraceAsString());
        }
        return ['message' => "changed"];

    }
}
