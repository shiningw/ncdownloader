<?php
namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\YoutubeHelper;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class Youtube
{
    private $ipv4Only;
    public $audioOnly = 0;
    public $audioFormat = 'm4a', $videoFormat;
    private $format = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
    private $options = [];
    private $downloadDir;
    private $timeout = 60 * 60 * 10; //10 hours
    private $outTpl = "%(id)s-%(title)s.%(ext)s";
    private $defaultDir = "/tmp/downloads";
    private $env = [];

    public function __construct(array $options)
    {
        $options += ['downloadDir' => '/tmp/downloads', 'settings' => []];
        $this->init($options);
    }
    public function init(array $options)
    {
        extract($options);
        if (isset($binary) && @is_executable($binary)) {
            $this->bin = $binary;
        } else {
            $this->bin = Helper::findBinaryPath('youtube-dl', __DIR__ . "/../../bin/youtube-dl");
        }
        $this->setDownloadDir($downloadDir);
        if (!empty($settings)) {
            foreach ($settings as $key => $value) {
                if (empty($value)) {
                    $this->addOption($key, true);
                } else {
                    $this->setOption($key, $value, true);
                }
            }
        }
        if (empty($lang = getenv('LANG')) || strpos(strtolower($lang), 'utf-8') === false) {
            $lang = 'C.UTF-8';
        }
        $this->setEnv('LANG', $lang);
        $this->addOption("--no-mtime");
        $this->addOption('--ignore-errors');

        if (($index = $this->hasOption('--output')) !== false) {
            $this->outTpl = $this->options[$index + 1];
            unset($this->options[$index]);
            unset($this->options[$index + 1]);
        }
    }

    public function setEnv($key, $val)
    {
        $this->env[$key] = $val;
    }

    public function audioMode()
    {
        if (Helper::ffmpegInstalled()) {
            $this->addOption('--prefer-ffmpeg');
            $this->addOption('--add-metadata');
            $this->setOption('--metadata-from-title', "%(artist)s-%(title)s");
            $this->addOption('--extract-audio');
        }
        $pos = strrpos($this->outTpl, '.');
        $this->outTpl = substr($this->outTpl, 0, $pos) . ".m4a";
        //$this->outTpl = "/%(id)s-%(title)s.m4a";
        $this->setAudioFormat($this->audioFormat);
        return $this;
    }

    public function setAudioQuality($value = 0)
    {
        $this->setOption('--audio-quality', $value);
    }

    public function setAudioFormat($format)
    {
        $this->setOption('--audio-format', $format);
    }

    public function setvideoFormat($format)
    {
        $this->videoFormat = $format;
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

    public function prependOption(string $option)
    {
        array_unshift($this->options, $option);
    }

    public function downloadSync($url)
    {
        $this->downloadDir = $this->downloadDir ?? $this->defaultDir;
        $this->prependOption($this->downloadDir . $this->outTpl);
        $this->prependOption("--output");
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
        if ($this->audioOnly) {
            $this->audioMode();
        } else {
            $this->setOption('--format', $this->format);
        }
        $this->helper = YoutubeHelper::create();
        $this->downloadDir = $this->downloadDir ?? $this->defaultDir;
        $this->setOption("--output", $this->downloadDir . "/" . $this->outTpl);
        $this->setUrl($url);
        $this->prependOption($this->bin);
        //\OC::$server->getLogger()->error($process->getCommandLine(), ['app' => 'PHP']);
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
        return ['error' => $process->getErrorOutput()];
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
        $this->prependOption($url);
        //$index = array_search('-i', $this->options);
        //array_splice($this->options, $index + 1, 0, $url);
    }
    public function setOption($key, $value, $hyphens = false)
    {
        $this->addOption($key, $hyphens);
        $this->addOption($value, false);
        return $this;
    }
    public function addOption(String $option, $hyphens = false)
    {
        if ($hyphens && substr($option, 0, 2) !== '--') {
            $option = "--" . $option;
        }
        array_push($this->options, $option);
    }

    protected function hasOption($name)
    {
        return array_search($name, $this->options);
    }

    public function forceIPV4()
    {
        $this->addOption('force-ipv4', true);
        return $this;
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
