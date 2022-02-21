<?php

namespace OCA\NCDownloader\Tools;

use OCA\NCDownloader\Tools\aria2Options;
use OC\Files\Filesystem;

class Helper
{
    public const DOWNLOADTYPE = ['ARIA2' => 1, 'YOUTUBE-DL' => 2, 'OTHERS' => 3];
    public const STATUS = ['ACTIVE' => 1, 'PAUSED' => 2, 'COMPLETE' => 3, 'WAITING' => 4, 'ERROR' => 5];
    const MAXLEN = 255;

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
        $filename = self::cleanString(basename($path));
        return self::clipFilename($filename);
    }
    public static function clipFilename($filename)
    {
        if (($len = strlen($filename)) > 64) {
            return substr($filename, $len - 64);
        }
        return $filename;
    }
    public static function getFilename($url)
    {
        if (self::isMagnet($url)) {
            $filename = self::parseUrl($url)['dn'];
        } else {
            $filename = self::getUrlPath($url);
        }
        return substr($filename, 0, self::MAXLEN);
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
        $regex = '%^(?:(?:https?)://)(?:[a-z0-9_]*\.)?(?:twitter|youtube)\.com/%i';
        return (bool) preg_match($regex, $url);
    }

    public static function cleanString($string)
    {
        $replace = array
            (
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
            '/ /' => '_', // nonbreaking space(equiv. to 0x160)
            // '/[^a-z0-9_\s.-]/i' => '_',
        );
        return preg_replace(array_keys($replace), array_values($replace), $string);
    }

    public static function debug($msg)
    {
        $logger = \OC::$server->getLogger();
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
        curl_close($ch);
        file_put_contents($file, $result);
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
        // store the value for 5 minutes
        $memcache->set($program, $result, 300);
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
    // the relative home folder of a nextcloud user
    public static function getUserFolder($uid = null)
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

}
