<?php

namespace OCA\NCDownloader\Aria2;

//use Symfony\Component\Process\ExecutableFinder;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use OCA\NCDownloader\Tools\Helper;

class Aria2
{
    //global Aria2 Config
    private $config = [];
    //extra Aria2 download options
    private $options = array();
    //optional token for authenticating with Aria2
    private $token = null;
    //the aria2 method being invoked
    public $methodName = null;
    //the aria2c binary path
    private $bin = null;
    // return the following items when getting downloads info by default
    private $dataFilter = array(
        'status', 'followedBy', 'totalLength', 'errorMessage', 'dir', 'uploadLength', 'completedLength', 'downloadSpeed', 'files', 'numSeeders', 'connections', 'gid', 'following', 'bittorrent',
    );
    //whether to filter the response returned by aria2
    private $filterResponse = true;
    //absolute download path
    private $downloadDir;
    //top-level aria2 configuration dir
    private $confDir;
    //aria2 session file
    private $sessionFile;
    //aria2 rpc url
    private $rpcUrl;
    //php binary path;
    private $php;
    //curl handle
    private $ch;
    //aria2 global options
    private $onDownloadStart;

    private $content;
    private $torrentsDir;
    public function __construct($options = array())
    {
        $options += [
            'rpcHost' => '127.0.0.1',
            'rpcPort' => 6800,
            'dir' => '/tmp/Downloads',
            'torrentsDir' => '/tmp/Torrents',
            'token' => 'ncdownloader123',
            'confDir' => '/tmp/aria2',
            //settings for each aria2 downloads
            'settings' => [],
            //options wich which aria2c starts
            'aria2Conf' => []
        ];
        //set the hooks if no user-defined equivalents
        $options["aria2Conf"] += [
            'on-download-complete' => $_SERVER['DOCUMENT_ROOT'] . "/apps/ncdownloader/hooks/completeHook.sh",
            'on-download-start' => $_SERVER['DOCUMENT_ROOT'] . "/apps/ncdownloader/hooks/startHook.sh",
        ];
        //turn keys in $options into variables
        extract($options);
        if (!empty($binary)) {
            $this->bin = $binary;
        } else {
            $this->bin = Helper::findBinaryPath('aria2c', __DIR__ . "/../../bin/aria2c");
        }
        if ($this->isInstalled() && !$this->isExecutable()) {
            chmod($this->bin, 0744);
        }
        $this->confDir = $confDir;
        $this->php = Helper::findBinaryPath('php');
        $this->rpcUrl = sprintf("http://%s:%s/jsonrpc", $rpcHost, $rpcPort);
        $this->sessionFile = $sessionFile ?? $this->confDir . "/aria2.session";
        $this->configureGlobalAria2($options);
        $this->configureLocalAria2($options);
    }
    public function init()
    {
        $this->ch = curl_init($this->rpcUrl);
        curl_setopt_array($this->ch, array(
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => false,
            CURLOPT_SSL_VERIFYPEER => false,
        ));
        $this->configure();
    }

    private function configureLocalAria2(array $options)
    {
        $this->setDownloadDir($options["dir"]);
        $this->setTorrentsDir($options["torrentsDir"]);
        $this->setToken($options["token"]);
        if (!empty($options["settings"])) {
            foreach ($options["settings"] as $key => $value) {
                $this->setOption($key, $value);
            }
        }
    }

    private function configureGlobalAria2(array $options)
    {
        $runOptions = new RunOptions($options["aria2Conf"]);

        $runOptions->add("--rpc-secret=" . $options["token"]);
        $runOptions->add("--rpc-listen-port=" . $options["rpcPort"]);
        $runOptions->add("--save-session=" . $this->sessionFile);
        $runOptions->add("--input-file=" . $this->sessionFile);
        $runOptions->add("--log=" . $this->confDir . "/aria2.log");

        //$this->logFile = $this->confDir . "/aria2.log";
        $this->config = $runOptions->getOptions();
    }

    public function setonDownloadStart($path)
    {
        $this->onDownloadStart = $path;
    }

    public function reset()
    {
        $this->init();
    }

    private function hasOption($key)
    {
        return (bool) isset($this->options[$key]);
    }

    private function configure()
    {
        if ($this->confDir && !is_dir($this->confDir)) {
            mkdir($this->confDir, 0755, true);
        }
        $dir = "";
        if (($dir = $this->getDownloadDir()) && !is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        if (($dir = $this->getTorrentsDir()) && !is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $this->followTorrent(true);
    }
    public function setToken($token)
    {
        $this->token = "token:$token";
        return $this;
    }
    public function setOption($key, $value)
    {
        $this->options[$key] = $value;
        return $this;
    }

    public function getOptions()
    {
        return $this->options;
    }
    public function setTorrentsDir($dir)
    {
        $this->torrentsDir = $dir;
        return $this;
    }
    public function getTorrentsDir(): string
    {
        return $this->torrentsDir;
    }
    public function setDownloadDir($dir)
    {
        $this->setOption('dir', $dir);
        $this->downloadDir = $dir;
        return $this;
    }
    public function getDownloadDir(): string
    {
        return $this->downloadDir;
    }
    public function setFileName($file)
    {
        $this->options['out'] = $file;
        return $this;
    }
    public function followTorrent($follow)
    {
        $this->options['follow-torrent'] = $follow;
        return $this;
    }
    private function request($data)
    {
        $this->init();
        $defaults = array(
            'jsonrpc' => '2.0',
            'id' => 'ncdownloader',
            'method' => 'aria2.addUri',
            'params' => null,
        );

        $data += $defaults;
        $this->content = json_encode($data);

        if (isset($this->content)) {
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, $this->content);
        }
        $resp = curl_exec($this->ch);
        curl_close($this->ch);
        return json_decode($resp, 1);
    }
    public function getFollowingGid($gid)
    {
        $data = $this->tellStatus($gid);
        if (!is_array($data)) {
            return 0;
        }
        $data = reset($data);
        return ($data['following'] ?? 0);
    }
    public function tellFail($range = [0, 999])
    {
        $this->filterResponse = false;
        $resp = $this->tellStopped($range);
        if (!isset($resp['result'])) {
            return [];
        }
        $result = $this->sortDownloadsResult($resp['result'], ['complete', 'removed']);
        $this->filterResponse = true;
        return $result;
    }
    public function tellAll()
    {
        $this->filterResponse = false;
        return array_merge($this->tellActive([]), $this->tellWaiting([0, 999]), $this->tellStopped([0, 999]));
    }
    public function __call($name, $args)
    {
        $this->methodName = $name;

        $data = array();
        if (isset($args[0]) && is_array($args[0]) && count($args) == 1 && strtolower($name) !== "adduri") {
            $args = reset($args);
        }
        switch ($name) {
            case "addUri":
            case "addTorrent":
                array_push($args, $this->options);
                break;
            case "tellActive":
            case "tellWaiting":
            case "tellStopped":
                array_push($args, $this->dataFilter);
                break;
            case "tellStatus":
            case "getFiles":
                array_push($args, $this->dataFilter);
                break;
        }
        if (isset($this->token)) {
            array_unshift($args, $this->token);
        }
        $data = array('params' => $args, 'method' => 'aria2.' . $name);
        $rawResp = $this->request($data);

        if (!$this->filterResponse) {
            return $rawResp;
        }
        return $this->parseResp($rawResp);
    }
    private function sortDownloadsResult($result, $statusFilter = null)
    {
        $data = [];
        if (!isset($statusFilter)) {
            $statusFilter = ['error'];
        }
        if (empty($result)) {
            return [];
        }
        foreach ($result as $info) {
            $info = Helper::filterData($info);
            if (isset($info['files'])) {
                foreach ($info['files'] as $key => &$files) {
                    $files = Helper::filterData($files, array('path', 'length'));
                }
            }
            if (in_array($info['status'], $statusFilter)) {
                continue;
            }
            array_push($data, $info);
        }
        return $data;
    }
    public function parseResp($resp = array())
    {
        $data = array();
        if (isset($resp['error']) && isset($resp['error']['message'])) {
            $data['error'] = $resp['error']['message'];
            return $data;
        }
        $result = $resp['result'] ?? null;
        if (!isset($result)) {
            return $data;
        }
        if ($this->methodName === 'tellStatus' && isset($result['files'])) {
            foreach ($result['files'] as $key => &$files) {
                $files = Helper::filterData($files, array('path', 'length'));
            }
            array_push($data, $result);
            return $data;
        }
        // parse response for tellActive,tellWaiting,and tellStopped
        if (strpos($this->methodName, "tell") !== false && is_array($result)) {
            return $this->sortDownloadsResult($result);
        }
        return $resp;
    }
    public function getStatus($gid)
    {
        return $this->tellStatus($gid);
    }

    public function download(String $url)
    {
        $resp = $this->addUri([$url]);

        if (isset($resp['error'])) {
            return $resp;
        }

        if (isset($resp['result']) && is_string($gid = $resp['result'])) {
            return $gid;
        }

        return false;
    }

    public function btDownload($file)
    {
        if ($data = file_get_contents($file)) {
            $filename = Helper::getBasicFilename($file);
            $torrent = base64_encode($data);
            $resp = $this->addTorrent($torrent, []);
        } else {
            return ['error' => "no valid torrents file!"];
        }
        if (isset($resp['error'])) {
            return $resp;
        }

        if (isset($resp['result']) && is_string($gid = $resp['result'])) {
            return ['gid' => $gid, 'filename' => $filename];
        }

        return false;
    }

    public function restart()
    {
        $this->stop();
        $this->start();
    }

    public function stop()
    {
        $resp = $this->shutdown();
        sleep(3);
        return $resp ?? null;
    }

    public function start($bin = null)
    {
        //aria2c refuses to start with no errors when input-file is set but missing
        if (!file_exists($this->sessionFile)) {
            file_put_contents($this->sessionFile, '');
        }

        //$process = new Process([$this->bin, "--conf-path=" . $this->confFile]);
        array_unshift($this->config, $this->bin);
        $process = new Process($this->config);
        try {
            $process->mustRun();
            $output = $process->getOutput();
        } catch (ProcessFailedException $exception) {
            $error = $exception->getMessage();
        }
        $resp = [];
        if (isset($error)) {
            $resp['error'] = $error;
            $resp['status'] = false;
        } else {
            $resp['status'] = true;
        }
        return $resp;
    }
    public function isInstalled()
    {
        return @is_file($this->bin);
    }
    public function isExecutable()
    {
        return @is_executable($this->bin);
    }

    public function isRunning()
    {
        $resp = $this->getSessionInfo();
        return (bool) $resp;
    }

    public function getBin()
    {
        return $this->bin;
    }
    public function version()
    {
        $resp = $this->getVersion();
        return $resp['result']['version'] ?? null;
    }
    public function install()
    {
        $url = "https://github.com/shiningw/ncdownloader-bin/raw/master/aria2c";
        Helper::Download($url, $this->bin);
    }
}
