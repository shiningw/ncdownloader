<?php

namespace OCA\NCDownloader\Tools;

use OC\Files\Filesystem;
use OCP\Files\IRootFolder;
use OCP\IUserSession;

class File
{

    private $dirName;
    private $suffix;
    private $files;

    //$dir_name = iconv("utf-8", "gb2312", $dir_name);

    public function __construct($dirname, $suffix = "php")
    {

        $this->dirName = $dirname;
        $this->suffix = $suffix;
    }

    public static function create($dir, $suffix)
    {
        return new static($dir, $suffix);
    }

    public function getFiles()
    {
        return $this->files;
    }

    public function scandir($recursive = false)
    {
        if (!is_dir($this->dirName)) {
            throw new \Exception("directory {$this->dirName} doesn't exist");
        }

        if ($recursive) {
            $this->files = $this->scandirRecursive();
            return $this->files;
        }

        $files = \glob($this->dirName . DIRECTORY_SEPARATOR . "*.{$this->suffix}");
        $this->files = $files;
        return $files;
    }

    protected function scandirRecursive()
    {
        $directory = new \RecursiveDirectoryIterator($this->dirName);
        $iterator = new \RecursiveIteratorIterator($directory);
        $iterators = new \RegexIterator($iterator, '/.*\.' . $this->suffix . '$/', \RegexIterator::GET_MATCH);

        foreach ($iterators as $info) {
            if ($info) {
                yield reset($info);
            }
        }
    }

    static public function getBasename($file)
    {
        return pathinfo($file, PATHINFO_FILENAME);
    }

    /**
     * Get the real local path of a virtual Nextcloud file
     * @param string $path Virtual path relative to the user's files folder (e.g. "/Downloads/file.txt")
     * @return string Real path on disk, or empty string if not found
     */
    public static function getLocalFile(string $path): string
    {
        $user = \OC::$server->getUserSession()->getUser();
        if (!$user) {
            return '';
        }
        $uid = $user->getUID();
        $userFolder = \OC::$server->getRootFolder()->getUserFolder($uid);
        // $path should start from inside the user's files directory
        // Ensure it's relative
        $relativePath = ltrim($path, '/');
        $node = $userFolder->get($relativePath);
        if ($node instanceof \OCP\Files\File) {
            return $node->getStorage()->getLocalFile($node->getInternalPath());
        } elseif ($node instanceof \OCP\Files\Folder) {
            // For a folder, getLocalFile doesn't apply, but we might need its path
            // For consistency, return the folder's local path (if supported by storage)
            return $node->getStorage()->getLocalFile($node->getInternalPath());
        }
        return '';
    }

}
