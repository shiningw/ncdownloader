<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\Settings;
use OC\Files\Utils\Scanner;
use \OCP\EventDispatcher\IEventDispatcher;

class folderScan
{
    private $user;
    private $path;
    public function __construct($path = null, $user = null)
    {
        $this->user = $user ?? \OC::$server->getUserSession()->getUser()->getUID();
        $this->path = $path ?? $this->getDefaultPath();
        $this->realDir = \OC::$server->getSystemConfig()->getValue('datadirectory') . "/" . $this->path;
    }

    public function getDefaultPath()
    {
        $settings = new Settings($this->user);
        $rootFolder = Helper::getUserFolder($this->user);
        $downloadDir = $settings->get('ncd_downloader_dir') ?? "/Downloads";
        return $rootFolder . "/" . ltrim($downloadDir, '/\\');
    }
    public static function create($path = null, $user = null)
    {
        return new static($path, $user);
    }

    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }
    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }

    private function update()
    {
        if (!(self::folderUpdated($this->realDir))) {
            return ['message' => "no change"];
        }
        $this->scan();
        return ['message' => "changed"];
    }
//force update
    public function scan()
    {
        $this->logger = \OC::$server->getLogger();
        $this->scanner = new Scanner($this->user, \OC::$server->getDatabaseConnection(), \OC::$server->query(IEventDispatcher::class), $this->logger);
        try {
            $this->scanner->scan($this->path);
            return ['status' => 'OK', 'path' => $this->path];
        } catch (ForbiddenException $e) {
            $this->logger->warning("Make sure you're running the scan command only as the user the web server runs as");
        } catch (\Exception $e) {

            $this->logger->warning("Exception during scan: " . $e->getMessage() . $e->getTraceAsString());
        }
        return ['status' => $e->getMessage(), 'path' => $this->path];

    }
    public static function folderUpdated($dir)
    {
        if (!file_exists($dir)) {
            return false;
        }
        $checkFile = $dir . "/.lastmodified";
        if (!file_exists($checkFile)) {
            $time = \filemtime($dir);
            file_put_contents($checkFile, $time);
            return false;
        }
        $lastModified = (int) file_get_contents($checkFile);
        $time = \filemtime($dir);
        if ($time > $lastModified) {
            file_put_contents($checkFile, $time);
            return true;
        }
        return false;
    }

    //update only folder is modified
    public static function sync($path = null, $user = null)
    {
        return self::create($path, $user)->update();
    }
}
