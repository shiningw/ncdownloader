<?php

namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use OC\Files\Utils\Scanner;
use \OCP\EventDispatcher\IEventDispatcher;

class folderScan
{
    private $user;
    private $path;
    private $realDir;
    private $logger;
    private $scanner;
    public function __construct($path = null, $user = null)
    {
        $this->user = $user ?? Helper::getUID();
        $this->path = $path ?? $this->getDefaultPath();
        $this->realDir = Helper::getLocalFolder(Helper::getDownloadDir());
    }

    public function getDefaultPath()
    {
        return Helper::getUserFolder() . Helper::getDownloadDir();
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
        if (!(Helper::folderUpdated($this->realDir))) {
            return ['message' => "no change"];
        }
        $this->scan();
        return ['message' => "changed"];
    }
    //force update
    public function scan()
    {
        $this->logger = Helper::getLogger();
        $this->scanner = new Scanner($this->user, Helper::getDatabaseConnection(), Helper::query(IEventDispatcher::class), $this->logger);
        try {
            $this->scanner->scan($this->path);
            return ['status' => true, 'path' => $this->path];
        } catch (\OCP\Files\ForbiddenException $e) {
            $this->logger->warning("Make sure you're running the scan command only as the user the web server runs as");
        } catch (\OCP\Files\NotFoundException $e) {
            $this->logger->warning("Path for the scan command not found: " . $e->getMessage());
        } catch (\Exception $e) {
            $this->logger->warning("Exception during scan: " . $e->getMessage() . $e->getTraceAsString());
        }
        return ['status' => false, 'path' => $this->path];
    }

    //update only folder is modified
    public static function sync($force = false, $path = null, $user = null)
    {
        $inst = self::create($path, $user);
        return $force ? $inst->scan() : $inst->update();
    }
}
