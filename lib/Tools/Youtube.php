<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class Youtube
{
    private $ipv4Only;
    private $audioOnly = 0;
    private $audioFormat, $videoFormat = 'mp4';
    private $options = [];
    private $downloadDir;
    public function __construct($config)
    {
        $config += ['downloadDir' => '/tmp/downloads'];
        $this->bin = Helper::findBinaryPath('youtube-dl');
        $this->setDownloadDir($config['downloadDir']);
    }

    public function GetUrlOnly()
    {
        $this->addOption('--get-filename');
        $this->addOption('--get-url');
        return $this;
    }

    public static function create()
    {
        return new self();
    }

    public function setDownloadDir($dir)
    {
        $this->downloadDir = rtrim($dir, '/');
    }

    public function getDownloadDir()
    {
        return $this->getDownloadDir;
    }

    public function prependOption($option)
    {
        array_unshift($this->options, $option);
    }

    public function download($url)
    {
        $this->downloadDir = $this->downloadDir ?? "/tmp/downloads";
        $this->prependOption($this->downloadDir . "/%(id)s-%(title)s.%(ext)s");
        $this->prependOption("-o");
        $this->setUrl($url);
        $this->prependOption($this->bin);
        // $this->buildCMD();
        $process = new Process($this->options);
        //the maximum time required to download the file
        $process->setTimeout(60*60*15);
        try {
            $process->mustRun();
            $output = $process->getOutput();
        } catch (ProcessFailedException $exception) {
            $output = $exception->getMessage();
        }
        return $output;
    }

    public function getDownloadUrl($url)
    {
        $this->setUrl($url);
        $this->GetUrlOnly();
        //$process = new Process($this->options);
        $this->buildCMD();
        exec($this->cmd, $output, $returnCode);
        if (count($output) === 1) {
            return ['url' => reset($output)];
        }
        list($url, $filename) = $output;
        return ['url' => $url, 'filename' => Helper::cleanString($filename)];
    }

    public function setUrl($url)
    {
        $this->addOption('-i');
        $this->addOption($url);
        //$index = array_search('-i', $this->options);
        //array_splice($this->options, $index + 1, 0, $url);
    }

    public function addOption($option)
    {
        array_push($this->options, $option);
    }

    public function forceIPV4()
    {
        $this->addOption('-4');
        return $this;
    }

    public function setAudioFormat($format)
    {
        $this->audioFormat = $format;
    }

    public function setvideoFormat($format)
    {
        $this->videoFormat = $format;
    }

    private function buildCMD()
    {
        $this->cmd = $this->bin; //. " 2>&1";

        foreach ($this->options as $option) {
            $this->cmd .= " " . $option;
        }

    }
    public function isInstalled()
    {
        return (bool) isset($this->bin);
    }
    public static function install()
    {
        $url = $this->installUrl();
        $path = \OC::$server->getSystemConfig()->getValue('datadirectory');
        Helper::Download($url, $path . "/youtube-dl");
    }

    public function installUrl()
    {
        return "https://yt-dl.org/downloads/latest/youtube-dl";
    }

}
