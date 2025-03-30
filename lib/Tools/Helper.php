<?php

namespace OCA\NCDownloader\Tools;

use Exception;
use OCA\NCDownloader\Search\Sites\searchInterface;
use OCA\NCDownloader\Aria2\Options as aria2Options;
use OCA\NCDownloader\Db\Settings;
use OCP\IUser;
use OC\Files\Filesystem;
use OC_Util;
use Psr\Log\LoggerInterface;
use OCA\NCDownloader\Aria2\Aria2;
use OCA\NCDownloader\Ytdl\Ytdl;
use OCA\NCDownloader\Http\Client;

require __DIR__ . "/../../vendor/autoload.php";

class Helper
{
    public const DOWNLOADTYPE = ['ARIA2' => 1, 'YOUTUBE-DL' => 2, 'OTHERS' => 3];
    public const STATUS = ['ACTIVE' => 1, 'PAUSED' => 2, 'COMPLETE' => 3, 'WAITING' => 4, 'ERROR' => 5];
    const MAXFILELEN = 255;

    public static function isUrl($URL)
    {
        $URLPattern = '%^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@|\d{1,3}(?:\.\d{1,3}){3}|(?:(?:[a-z\d\x{00a1}-\x{ffff}'
            . ']+-?)*[a-z\d\x{00a1}-\x{ffff}]+)(?:\.(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)*(?:\.'
            . '[a-z\x{00a1}-\x{ffff}]{2,6}))(?::\d+)?(?:[^\s]*)?$%iu';

        preg_match($URLPattern, $URL, $Matches);
        if (count($Matches) === 1) {
            return true;
        }
        return false;
    }

    public static function isMagnet($url)
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);
        return strtolower($scheme) == "magnet";
    }
    public static function isHttp($url)
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);
        return (in_array($scheme, array('http', 'https')));
    }
    public static function isFtp($url)
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);
        return strtolower($scheme) == "ftp";
    }
    public static function isGetUrlSite($url)
    {
        $host = parse_url($url, PHP_URL_HOST);
        //$sites = ['twitter.com', 'www.twitter.com'];
        $sites = [];
        return (bool) (in_array($host, $sites));
    }
    public static function parseUrl($url)
    {
        parse_str(str_replace('tr=', 'tr[]=', parse_url($url, PHP_URL_QUERY)), $query);
        return $query;
    }

    public static function getUrlPath($url)
    {
        $path = parse_url($url, PHP_URL_PATH);
        $filename = self::cleanString(urldecode(basename($path)));
        return self::clipFilename($filename);
    }
    public static function clipFilename($filename)
    {
        if (($len = strlen($filename)) > self::MAXFILELEN) {
            return substr($filename, $len - self::MAXFILELEN);
        }
        return $filename;
    }
    public static function getFilename($url): string
    {
        if (self::isMagnet($url)) {
            $info = self::parseUrl($url);
            $filename = $info["dn"] ?? "";
        } else {
            $filename = self::getUrlPath($url);
        }
        return self::clipFilename($filename);
    }
    public static function formatBytes($size, $precision = 2)
    {
        if ($size < 1) {
            return '0';
        }
        $base = log($size, 1024);
        $suffixes = array('', 'K', 'M', 'G', 'T');
        return round(pow(1024, $base - floor($base)), $precision) . ' ' . $suffixes[floor($base)];
    }

    public static function checkMediaType($url, $type = 'video/mp4')
    {
        $result = parse_url($url);
        if (isset($result['scheme']) && self::isHttp($url)) {
            if (isset($result['query'])) {
                parse_str($result['query'], $output);
                if (!isset($output['mime'])) {
                    return false;
                }
            }
            return (bool) ($output['mime'] == trim($type));
        }
        return false;
    }

    public static function isYoutubeType($url)
    {
        $regex = '%^(?:(?:https?)://)(?:[a-z0-9_]*\.)?(?:twitter|ytdl)\.com/%i';
        return (bool) preg_match($regex, $url);
    }

    public static function cleanString($string)
    {
        $replace = array(
            '/[áàâãªä]/u' => 'a',
            '/[ÁÀÂÃÄ]/u' => 'A',
            '/[ÍÌÎÏ]/u' => 'I',
            '/[íìîï]/u' => 'i',
            '/[éèêë]/u' => 'e',
            '/[ÉÈÊË]/u' => 'E',
            '/[óòôõºö]/u' => 'o',
            '/[ÓÒÔÕÖ]/u' => 'O',
            '/[úùûü]/u' => 'u',
            '/[ÚÙÛÜ]/u' => 'U',
            '/ç/' => 'c',
            '/Ç/' => 'C',
            '/ñ/' => 'n',
            '/Ñ/' => 'N',
            '/–/' => '-', // UTF-8 hyphen to "normal" hyphen
            '/[’‘‹›‚]/u' => '', // Literally a single quote
            '/[“”«»„]/u' => '', // Double quote
            //'/ /' => '_', // nonbreaking space(equiv. to 0x160)
            // '/[^a-z0-9_\s.-]/i' => '_',
        );
        return preg_replace(array_keys($replace), array_values($replace), $string);
    }

    public static function debug($msg)
    {
        if (is_array($msg)) {
            $msg = implode(",", $msg);
        }
        $logger = self::getLogger();
        $logger->error($msg, ['app' => 'ncdownloader']);
    }

    public static function log($msg, $file = "/tmp/nc.log")
    {
        file_put_contents($file, print_r($msg, true), FILE_APPEND);
    }
    public static function filterData($data, $filter = null)
    {
        if (!isset($filter)) {
            $filter = array(
                'status', 'followedBy', 'totalLength', 'errorMessage', 'dir', 'uploadLength', 'completedLength', 'downloadSpeed', 'files', 'numSeeders', 'connections', 'gid', 'following',
            );
        }
        $value = array_filter($data, function ($k) use ($filter) {
            return (in_array($k, $filter));
        }, ARRAY_FILTER_USE_KEY);
        return $value;
    }

    public function getFolderName($folder, $prefix)
    {
        $folder = ltrim($folder, $prefix);
        return substr($folder, 0, strpos($folder, '/'));
    }

    public static function Download($url, $file = null)
    {
        if (!isset($file)) {
            $file = "/tmp/" . self::getFilename($url);
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            $error = 'Error:' . curl_error($ch);
        }
        curl_close($ch);
        if (isset($error)) {
            throw new \Exception($error);
        } else {
            if (!file_put_contents($file, $result)) {
                throw new \Exception("failed to save " . $file);
            }
        }
    }

    public static function is_function_enabled($function_name)
    {
        if (!function_exists($function_name)) {
            return false;
        }
        $ini = \OC::$server->getIniWrapper();
        $disabled = explode(',', $ini->get('disable_functions') ?: '');
        $disabled = array_map('trim', $disabled);
        if (in_array($function_name, $disabled)) {
            return false;
        }
        $disabled = explode(',', $ini->get('suhosin.executor.func.blacklist') ?: '');
        $disabled = array_map('trim', $disabled);
        if (in_array($function_name, $disabled)) {
            return false;
        }
        return true;
    }

    public static function findBinaryPath($program, $default = null)
    {
        $memcache = \OC::$server->getMemCacheFactory()->createDistributed('findBinaryPath');
        if ($memcache->hasKey($program)) {
            return $memcache->get($program);
        }

        $dataPath = \OC::$server->getSystemConfig()->getValue('datadirectory');
        $paths = ['/usr/local/sbin', '/usr/local/bin', '/usr/sbin', '/usr/bin', '/sbin', '/bin', '/opt/bin', $dataPath . "/bin"];
        $result = $default;
        $exeSniffer = new ExecutableFinder();
        // Returns null if nothing is found
        $result = $exeSniffer->find($program, $default, $paths);
        if ($result) {
            // store the value for 5 minutes
            $memcache->set($program, $result, 300);
        }
        return $result;
    }

    public static function formatInterval($interval, $granularity = 2)
    {
        $units = array(
            '1 year|years' => 31536000,
            '1 monthmonths' => 2592000,
            '1 week|weeks' => 604800,
            '1 day|days' => 86400,
            '1 hour|hours' => 3600,
            '1 min|mins' => 60,
            '1 sec|sec' => 1,
        );
        $output = '';
        foreach ($units as $key => $value) {
            $key = explode('|', $key);
            if ($interval >= $value) {
                $output .= ($output ? ' ' : '') . self::formatPlural(floor($interval / $value), $key[0], $key[1]);
                $interval %= $value;
                $granularity--;
            }
            if ($granularity == 0) {
                break;
            }
        }
        return $output ? $output : '0 sec';
    }

    public static function formatPlural($count, $singular, $plural)
    {
        if ($count == 1) {
            return $singular;
        } else {
            return $count . " " . $plural;
        }
    }
    public static function aria2Options()
    {
        return aria2Options::get();
    }

    public static function getTableTitles($type = null)
    {
        $general = ['filename', 'status', 'actions'];
        if (!isset($type)) {
            return $general;
        }
        $titles = [
            'active' => ['filename', 'speed', 'progress', 'actions'],
            'waiting' => $general,
            'fail' => $general,
            'complete' => $general,
        ];
        return $titles[$type];
    }
    // the relative home folder of a nextcloud user,e.g. /admin/files
    public static function getUserFolder($uid = null): string
    {
        if (!empty($rootFolder = Filesystem::getRoot())) {
            return $rootFolder;
        } else if (isset($uid)) {
            return "/" . $uid . "/files";
        }
        return '';
    }

    public static function generateGID($str = null)
    {
        if (isset($str)) {
            return md5($str);
        }
        return sprintf('%04x%04x%04x%04x%04x%04x%04x%04x', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479));
    }
    public static function ffmpegInstalled()
    {
        return (bool) self::findBinaryPath('ffmpeg');
    }
    // filename without extension
    public static function getBasicFilename($path)
    {
        return pathinfo($path, PATHINFO_FILENAME);
    }
    public static function sanitize($string)
    {
        return filter_var($string, FILTER_SANITIZE_STRING);
    }

    public static function doSignal($pid, $signal): bool
    {
        if (\function_exists('posix_kill')) {
            $ok = @posix_kill($pid, $signal);
        } elseif ($ok = proc_open(sprintf('kill -%d %d', $signal, $pid), [2 => ['pipe', 'w']], $pipes)) {
            $ok = false === fgets($pipes[2]);
        }

        if (!$ok) {
            return false;
        }
        return true;
    }

    public static function isRunning($pid)
    {
        return self::doSignal($pid, 0);
    }

    public static function stop($pid)
    {
        return self::doSignal($pid, 9);
    }

    public static function pythonInstalled(): bool
    {
        return (self::findBinaryPath('python') || self::findBinaryPath('python3'));
    }

    public static function findSearchSites($dir, $suffix = 'php'): array
    {
        $filetool = File::create($dir, $suffix);
        $files = $filetool->scandir();
        $sites = [];
        foreach ($files as $file) {
            $basename = File::getBasename($file);
            $namespace = 'OCA\\NCDownloader\\Search\\Sites\\';
            $className = $namespace . $basename;
            if (in_array(searchInterface::class, class_implements($className))) {
                $sites[] = ['class' => $className, 'name' => $basename];
            }
        }
        return $sites;
    }

    public static function getSearchSites(): array
    {
        $key = 'searchSites';
        $memcache = \OC::$server->getMemCacheFactory()->createDistributed($key);
        if ($memcache->hasKey($key)) {
            $sites = $memcache->get($key);
        } else {
            try {
                $sites = Helper::findSearchSites(__DIR__ . "/../Search/Sites/");
                $memcache->set($key, $sites, 300);
            } catch (\Exception $e) {
                self::debug($e->getMessage());
            }
        }
        return $sites;
    }

    public static function getMountPoints(): ?array
    {
        return Filesystem::getMountPoints("/");
    }

    public static function getDataDir(): string
    {
        return \OC::$server->getSystemConfig()->getValue('datadirectory');
    }

    public static function getLocalFolder(string $path): string
    {
        if (self::getUID()) {
            OC_Util::setupFS();
            //get the real path of the file in the filesystem
            return \OC_User::getHome(\OC_User::getUser()) . '/files' . $path;
        }
        return "";
    }

    public static function getRealDownloadDir(): string
    {
        $dlDir = self::getDownloadDir();
        return self::getLocalFolder($dlDir);
    }
    public static function getRealTorrentsDir(): string
    {
        $dir = self::getSettings('ncd_torrents_dir', "/Torrents");
        return self::getLocalFolder($dir);
    }

    public static function getUser(): ?IUser
    {
        return \OC::$server->get(\OCP\IUserSession::class)->getUser();
    }

    public static function getUID(): string
    {
        $user = self::getUser();
        $uid = $user ? $user->getUID() : "";
        return $uid;
    }

    public static function getSettings($key, $default = null, int $type = Settings::TYPE['USER'])
    {
        $settings = self::newSettings();
        return $settings->setType($type)->get($key, $default);
    }

    public static function newSettings($uid = null)
    {
        $uid = $uid ?? self::getUID();
        return Settings::create($uid);
    }

    public static function getYtdlConfig($uid = null): array
    {
        $config = [
            'binary' => self::getAdminSettings("ncd_yt_binary"),
            'downloadDir' => Helper::getRealDownloadDir(),
            'settings' => self::newSettings()->getYtdl(),
        ];
        return $config;
    }

    public static function getAria2Config($uid = null): array
    {
        $options = [];
        $uid = $uid ?? self::getUID();
        $settings = self::newSettings($uid);
        $realDownloadDir = Helper::getRealDownloadDir();
        $torrentsDir = Helper::getRealTorrentsDir();
        $appPath = self::getAppPath();
        $dataDir = self::getDataDir();
        $aria2Dir = $dataDir . "/aria2";
        $options['seed_time'] = $settings->get("ncd_seed_time");
        $options['seed_ratio'] = $settings->get("ncd_seed_ratio");
        if (is_array($customSettings = $settings->getAria2())) {
            $options = array_merge($customSettings, $options);
        }
        $token = Helper::getAdminSettings("ncd_aria2_rpc_token");
        $rpcHost = Helper::getAdminSettings("ncd_aria2_rpc_host");
        $rpcPort = Helper::getAdminSettings("ncd_aria2_rpc_port");
        $binary = Helper::getAdminSettings("ncd_aria2_binary");
        $config = [
            'dir' => $realDownloadDir,
            'torrentsDir' => $torrentsDir,
            'confDir' => $aria2Dir,
            'token' =>  $token ? $token : "ncdownloader123",
            'settings' => $options,
            'rpcHost' => $rpcHost ? $rpcHost : "127.0.0.1",
            'rpcPort' => $rpcPort ? $rpcPort : "6800",
            'binary' => $binary,
            'startHook' => $appPath . "/hooks/startHook.sh",
            'completeHook' => $appPath . "/hooks/completeHook.sh",
            'aria2Conf' => Helper::getSettings("global_aria2_config", [], $settings::TYPE['SYSTEM'])
        ];
        return $config;
    }

    public static function getAppPath(): string
    {
        return \OC::$server->getAppManager()->getAppPath('ncdownloader');
    }
    public static function folderUpdated(string $dir): bool
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
    public static function getDownloadDir(): string
    {
        return self::getSettings('ncd_downloader_dir', "/Downloads");
    }
    public static function getVersion(): array
    {
        $config = \OC::$server->get(\OCP\IConfig::class);
        $version = $config->getSystemValue('version');
        return explode(".", $version);
    }
    public static function isLegacyVersion(): bool
    {
        return (version_compare(implode(".", self::getVersion()), '20.0.0') < 0);
    }
    public static function query($key)
    {
        return self::isLegacyVersion() ? \OC::$server->query($key) : \OC::$server->get($key);
    }
    public static function getLogger()
    {
        return (version_compare(implode(".", self::getVersion()), '24.0.0') < 0) ? \OC::$server->getLogger() : \OC::$server->get(LoggerInterface::class);
    }
    public static function getDatabaseConnection()
    {
        return self::isLegacyVersion() ? \OC::$server->getDatabaseConnection() : \OC::$server->get(\OCP\IDBConnection::class);
    }
    public static function getAdminSettings($key): string
    {
        $settings = self::getAllAdminSettings();
        return $settings[$key] ?? "";
    }
    public static function getAllAdminSettings(): array
    {
        return Helper::getSettings("ncd_admin_settings", [], Settings::TYPE["SYSTEM"]);
    }
    public static function getAria2Version(): ?string
    {
        //get aria2 instance 
        $aria2 = self::query(Aria2::class);
        return $aria2->version();
    }
    public static function getYtdlVersion(): ?string
    {
        $ytdl = self::query(Ytdl::class);
        return $ytdl->version();
    }

    public static function getAdminOptions($data)
    {
        $options = [
            [
                "label" => "Aria2 RPC Host",
                "id" => "ncd_aria2_rpc_host",
                "value" => $data['ncd_aria2_rpc_host'] ?? "",
                "placeholder" => $data['ncd_aria2_rpc_host'] ?? "127.0.0.1",
                "path" => $data['path'],
            ],
            [
                "label" => "Aria2 RPC Port",
                "id" => "ncd_aria2_rpc_port",
                "value" => $data['ncd_aria2_rpc_port'] ?? "",
                "placeholder" => $data['ncd_aria2_rpc_port'] ?? 6800,
                "path" => $data['path'],
            ],
            [
                "label" => "Aria2 RPC Token",
                "id" => "ncd_aria2_rpc_token",
                "value" => $data['ncd_aria2_rpc_token'] ?? "",
                "placeholder" => $data['ncd_aria2_rpc_token'] ?? "ncdownloader123",
                "path" => $data['path'],
            ],
            [
                "label" => "Youtube-dl binary",
                "id" => "ncd_yt_binary",
                "value" => $data['ncd_yt_binary'] ?? "",
                "placeholder" => $data['ncd_yt_binary'] ?? "/usr/bin/youtube-dl",
                "path" => $data['path'],
            ],
            [
                "label" => "Aria2c binary",
                "id" => "ncd_aria2_binary",
                "value" => $data['ncd_aria2_binary'] ?? "",
                "placeholder" => $data['ncd_aria2_binary'] ?? "/usr/bin/aria2c",
                "path" => $data['path'],
            ]
        ];
        return $options;
    }
    public static function getLatestRelease($owner, $repo)
    {
        $client = Client::create();
        $response = $client->request('GET', "https://api.github.com/repos/$owner/$repo/releases/latest", [
            'headers' => [
                'User-Agent' => 'PHP'
            ]
        ]);
        $data = json_decode($response->getContent(), true);
        if (isset($data['tag_name'])) {
            return $data['tag_name'];
        }
        return null;
    }

    public static function downloadLatestRelease($owner, $repo, $file)
    {
        $client = Client::create(['max_redirects' => 10]);
        $response = $client->request('GET', "https://api.github.com/repos/$owner/$repo/releases/latest", [
            'headers' => [
                'User-Agent' => 'PHP'
            ]
        ]);
        $data = json_decode($response->getContent(), true);
        $downloadUrl = null;
        foreach ($data['assets'] as $asset) {
            if ($asset['name'] == $repo) {
                $downloadUrl = $asset['browser_download_url'];
                break;
            }
        }
        if ($downloadUrl) {
            if (!is_writable(dirname($file))) {
                throw new \Exception(dirname($file) . " is not writable");
            }
            $response = $client->request('GET', $downloadUrl);
            if ($byte = file_put_contents($file, $response->getContent())) {
                return $byte;
            } else {
                throw new \Exception("Failed to download $downloadUrl");
            }
        }
        return false;
    }
    public static function removeLetters($str)
    {
        return preg_replace('/[^0-9.]+/', '', $str);
    }
}
