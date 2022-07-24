<?php

namespace OCA\NCDownloader\http;

//require __DIR__ . "/../../vendor/autoload.php";
use Symfony\Component\HttpClient\HttpClient;

final class Client
{
    public function __construct(?array $options = null)
    {
        $this->client = HttpClient::create($this->configure($options));
    }

    public static function create(?array $options = null)
    {
        return new self($options);
    }

    private function defaultUserAgent(): string
    {
        return "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36";
    }

    private function defaultOptions(): array
    {
        $settings = [
            'headers' => [
            ],
            'extra' => ['curl' => null],
        ];
        return $settings;
    }

    private function configure(array $options): array
    {

        extract($options);
        $settings = $this->defaultOptions();
        $settings['extra']['curl'] = $curl ?? [];
        $settings['headers'] = $headers ?? [];

        if ($ipv4 || $force_ipv4) {
            $settings['extra']['curl'] = [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4];
        }
        $settings['headers']['User-Agent'] = $useragent ?? $this->defaultUserAgent();

        return $settings;
    }
    public function request(string $url, $method, ?array $options = [])
    {
        return $this->client->request($url, $method, $options);
    }
}
