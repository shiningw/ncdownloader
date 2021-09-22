<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\YoutubeHelper;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class Youtube
{
    private $ipv4Only;
    private $audioOnly = 0;
    private $audioFormat, $videoFormat = 'mp4';
    private $options = [];
    private $downloadDir;
    private $timeout = 60 * 60 * 15;
    private $outTpl = "/%(id)s-%(title)s.%(ext)s";
    private $defaultDir = "/tmp/downloads";
    private $env = [];

    public function __construct($config)
    {
        $config += ['downloadDir' => '/tmp/downloads'];
        $this->bin = $config['binary'] ?? Helper::findBinaryPath('youtube-dl');
        $this->init();
        $this->setDownloadDir($config['downloadDir']);
    }
    public function init()
    {
        if (empty($lang = getenv('LANG')) || strpos(strtolower($lang), 'utf-8') === false) {
            $lang = 'C.UTF-8';
        }
        $this->setEnv('LANG', $lang);
        $this->addOption("--no-mtime");
    }

    public function setEnv($key, $val)
    {
        $this->env[$key] = $val;
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

    public function downloadSync($url)
    {
        $this->downloadDir = $this->downloadDir ?? $this->defaultDir;
        $this->prependOption($this->downloadDir . $this->outTpl);
        $this->prependOption("-o");
        $this->setUrl($url);
        $this->prependOption($this->bin);
        // $this->buildCMD();
        $process = new Process($this->options, null, $this->env);
        //the maximum time required to download the file
        $process->setTimeout($this->timeout);
        try {
            $process->mustRun();
            $output = $process->getOutput();
        } catch (ProcessFailedException $exception) {
            $output = $exception->getMessage();
        }

        return $output;
    }

    public function download($url)
    {
        $this->helper = YoutubeHelper::create();
        $this->downloadDir = $this->downloadDir ?? $this->defaultDir;
        $this->prependOption($this->downloadDir . $this->outTpl);
        $this->prependOption("-o");
        $this->setUrl($url);
        $this->prependOption($this->bin);
        $process = new Process($this->options, null, $this->env);
        $process->setTimeout($this->timeout);
        $process->run(function ($type, $buffer) use ($url) {
            if (Process::ERR === $type) {
                $this->onError($buffer);
            } else {
                $this->onOutput($buffer, $url);
            }
        });
        if ($process->isSuccessful()) {
            $this->helper->updateStatus(Helper::STATUS['COMPLETE']);
            return ['message' => $this->helper->file ?? $process->getErrorOutput()];
        }
        return $process->getErrorOutput();

    }
    public function getFilePath($output)
    {
        $rules = '#\[download\]\s+Destination:\s+(?<filename>.*\.(?<ext>(mp4|mp3|aac)))$#i';

        preg_match($rules, $output, $matches);

        return $matches['filename'] ?? null;
    }

    private function onError($buffer)
    {
        $this->helper->log($buffer);
    }

    public function onOutput($buffer, $url)
    {
        $this->helper->run($buffer, $url);
    }
    public function getDownloadUrl($url)
    {
        $this->setUrl($url);
        $this->GetUrlOnly();
        $this->buildCMD();
        exec($this->cmd, $output, $returnCode);
        if (count($output) === 1) {
            return ['url' => reset($output)];
        }
        list($url, $filename) = $output;
        $filename = Helper::cleanString($filename);
        return ['url' => $url, 'filename' => Helper::clipFilename($filename)];
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
        return (bool) (isset($this->bin) && @is_executable($this->bin));
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
