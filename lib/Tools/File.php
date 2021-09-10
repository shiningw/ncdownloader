<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use OC\Files\Filesystem;
use OC\Files\Utils\Scanner;
use \OCP\EventDispatcher\IEventDispatcher;

class File
{
    public static function syncFolder($dir)
    {
        $user = \OC::$server->getUserSession()->getUser()->getUID();
        $logger = \OC::$server->getLogger();
        $scanner = new Scanner($user, \OC::$server->getDatabaseConnection(), \OC::$server->query(IEventDispatcher::class), $logger);
        $path = Filesystem::getRoot() . "/" . ltrim($dir, '/\\');
        try {
            $scanner->scan($path);
           // Helper::debug($logger->getLogPath());
            //$logger->warning($logger->getLogPath(),['app' =>'Ncdownloader']);
        } catch (ForbiddenException $e) {
            $logger->warning("Make sure you're running the scan command only as the user the web server runs as");
        } catch (\Exception $e) {

            $logger->warning("Exception during scan: " . $e->getMessage() . $e->getTraceAsString());
        }
    }
}
