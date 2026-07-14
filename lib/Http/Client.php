<?php

namespace OCA\Vapor\Http;

//require __DIR__ . "/../../vendor/autoload.php";
use Symfony\Component\HttpClient\HttpClient;

final class Client
{
    private $client;
    public function __construct(?array $options = [])
    {
        $this->client = HttpClient::create($this->configure($options));
    }

    public static function create(?array $options =[])
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
            'headers' => [],
            'extra' => ['curl' => null],
        ];
        return $settings;
    }

    private function configure(array $options): array
    {
        $settings = $this->defaultOptions();
        $settings['extra']['curl'] = $options['curl'] ?? [];
        $settings['headers'] = $options['headers'] ?? [];

        if (!empty($options['ipv4']) || !empty($options['force_ipv4'])) {
            $settings['extra']['curl'] = [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4];
        }
        $settings['headers']['User-Agent'] = $options['useragent'] ?? $this->defaultUserAgent();

        return $settings;
    }
    public function request(string $url, $method, ?array $options = [])
    {
        return $this->client->request($url, $method, $options);
    }
}
