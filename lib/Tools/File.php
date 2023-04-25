<?php

namespace OCA\NCDownloader\Tools;

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
}
