<?php

namespace OCA\NCDownloader\Tools;

//use Symfony\Component\Process\ExecutableFinder;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class Aria2
{
    //extra Aria2 download options
    private $options = array();
    //optional token for authenticating with Aria2
    private $token = null;
    //the aria2 method being invoked
    private $method = null;
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
    public function __construct($options = array())
    {
        $options += array(
            'host' => '127.0.0.1',
            'port' => 6800,
            'dir' => '/tmp/Downloads',
            'torrents_dir' => '/tmp/Torrents',
            'token' => null,
            'conf_dir' => '/tmp/aria2',
            'completeHook' => $_SERVER['DOCUMENT_ROOT'] . "/apps/ncdownloader/hooks/completeHook.sh",
            'settings' => [],
        );
        //turn keys in $options into variables
        extract($options);
        if (isset($binary) && $this->isExecutable($binary)) {
            $this->bin = $binary;
        } else {
            $this->bin = Helper::findBinaryPath('aria2c', __DIR__ . "/../../bin/aria2c");
        }
        $this->setDownloadDir($dir);
        $this->setTorrentsDir($torrents_dir);
        if (!empty($settings)) {
            foreach ($settings as $key => $value) {
                $this->setOption($key, $value);
            }
        }
        $this->php = Helper::findBinaryPath('php');
        $this->completeHook = $completeHook;
        $this->startHook = $startHook;
        $this->rpcUrl = sprintf("http://%s:%s/jsonrpc", $host, $port);
        $this->tokenString = $token ?? 'ncdownloader123';
        $this->setToken($this->tokenString);
        $this->confDir = $conf_dir;
        $this->sessionFile = $this->confDir . "/aria2.session";
        $this->confFile = $this->confDir . "/aria2.conf";
        $this->logFile = $this->confDir . "/aria2.log";
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
        if (!is_dir($this->confDir)) {
            mkdir($this->confDir, 0755, true);
        }
        if (!file_exists($this->confDir . "/aria2.conf")) {
            file_put_contents($this->confDir . "/aria2.conf", $this->confTemplate());
        }
        if (!is_dir($dir = $this->getDownloadDir())) {
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
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $this;
    }
    public function getTorrentsDir()
    {
        return $this->torrentsDir;
    }
    public function setDownloadDir($dir)
    {
        $this->setOption('dir', $dir);
        $this->downloadDir = $dir;
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $this;
    }
    public function getDownloadDir()
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
    public function restart()
    {
        $this->stop();
        $this->start();
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

    public function getDefaults()
    {
        return [
            '--continue',
            '--daemon=true',
            '--enable-rpc=true',
            '--rpc-secret=' . $this->tokenString,
            '--listen-port=51413',
            '--save-session=' . $this->sessionFile,
            '--input-file=' . $this->sessionFile,
            '--log=' . $this->logFile,
            '--rpc-listen-port=6800',
            '--follow-torrent=true',
            '--enable-dht=true',
            '--enable-peer-exchange=true',
            '--peer-id-prefix=-TR2770-',
            '--user-agent=Transmission/2.77',
            '--log-level=notice',
            '--seed-ratio=1.0',
            '--bt-seed-unverified=true',
            '--max-overall-upload-limit=1M',
            '--max-overall-download-limit=0',
            '--max-connection-per-server=4',
            '--max-concurrent-downloads=10',
            '--check-certificate=false',
            '--on-download-complete=' . $this->completeHook,
            '--on-download-start=' . $this->startHook,
        ];
    }
    public function start($bin = null)
    {
        //aria2c refuses to start with no errors when input-file is set but missing
        if (!file_exists($this->sessionFile)) {
            file_put_contents($this->sessionFile, '');
        }

        //$process = new Process([$this->bin, "--conf-path=" . $this->confFile]);
        $defaults = $this->getDefaults();
        array_unshift($defaults, $this->bin);
        $process = new Process($defaults);
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
    public function stop()
    {
        $resp = $this->shutdown();
        sleep(3);
        return $resp ?? null;
    }
    private function confTemplate()
    {
        return <<<EOF
continue
daemon=true
#dir=/home/aria2/Downloads
#file-allocation=falloc
log-level=info
max-connection-per-server=4
max-concurrent-downloads=5
max-overall-download-limit=0
min-split-size=5M
enable-http-pipelining=true
#interface=127.0.0.1
enable-rpc=true
rpc-secret=$this->tokenString
rpc-listen-all=true
rpc-listen-port=6800
follow-torrent=true
listen-port=51413
enable-dht=true
enable-peer-exchange=true
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77
seed-ratio=0.1
bt-seed-unverified=true
max-overall-upload-limit=1M
#on-download-complete=
#on-download-error=
#on-download-start=
save-session=$this->sessionFile
input-file=$this->sessionFile
log=$this->logFile
EOF;
    }
}
