<?php

namespace OCA\NCDownloader\Tools;

class File
{

    private $dirName;

    //$dir_name = iconv("utf-8", "gb2312", $dir_name);

    public function __construct($dirname, $suffix = "php")
    {

        $this->dirName = $dirname;
        $this->suffix = $suffix;

        if (!is_dir($dirname)) {
            throw new \Exception("directory ${dirname} doesn't exit");
        }

    }

    public static function create($dir, $suffix)
    {
        return new static($dir, $suffix);
    }

    public function scandir($recursive = false)
    {
        if ($recursive) {
            return $this->scandirRecursive();
        }

        $files = \glob($this->dirName . DIRECTORY_SEPARATOR . "*.{$this->suffix}");
        $this->Files = $files;
        return $files;
    }

    protected function scandirRecursive()
    {

        $directory = new \RecursiveDirectoryIterator($this->dirName);
        $iterator = new \RecursiveIteratorIterator($directory);
        $iterators = new \RegexIterator($iterator, '/.*\.' . $this->suffix . '$/', \RegexIterator::GET_MATCH);

        $files = array();
        foreach ($iterators as $info) {
            if ($info) {
                $files[] = reset($info);
            }
        }
        $this->Files = $files;
        return $files;
    }
    public function getBasename($file){
        return basename($file,".".$this->suffix);
    }
}
