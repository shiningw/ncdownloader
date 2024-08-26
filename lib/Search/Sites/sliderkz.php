<?php

namespace OCA\NCDownloader\Search\Sites;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\tableData;

//slider.kz
class sliderkz extends searchBase implements searchInterface
{
    public $baseUrl = "https://hayqbhgr.slider.kz/vk_auth.php";
    protected $query = null;
    protected $tableTitles = [];

    public function __construct($crawler, $client)
    {
        $this->client = $client;
    }

    public function search(string $keyword): tableData
    {
        $this->query = ['q' => trim($keyword)];
        $this->searchUrl = $this->baseUrl;
        $this->getItems()->setTableTitles(["Title", "Duration", "Actions"])->addActionLinks();
        if ($this->hasErrors()) {
            return tableData::create()->setError($this->getErrors());
        }
        return tableData::create($this->getTableTitles(), $this->getRows());
    }

    public function getItems()
    {
        $data = $this->getResponse();
        $this->rows = $this->transformResp($data);
        return $this;
    }
    protected function getDownloadUrl(array $item): string
    {
        extract($item);
        return sprintf("https://hayqbhgr.slider.kz/%s/%s/%s/%s.mp3?extra=null",$id,$duration, $durl, urlencode($tit_art));
    }

    private function transformResp($data): array
    {
        $items = [];
        if (count($data) < 1 || $this->hasErrors()) {
            return [];
        }
        foreach ($data as $item) {
            if (empty($item)) {
                continue;
            }
            $items[] = array("title" => $item["tit_art"], "data-link" => $this->getDownloadUrl($item), "duration" => Helper::formatInterval($item["duration"]));
        }
        unset($data);
        return $items;
    }

    public function getResponse(): array
    {

        try {
            $response = $this->client->request('GET', $this->searchUrl, ['query' => $this->query]);
            $resp = $response->toArray();
            if (isset($resp['audios'])) {
                return array_values($resp["audios"])[0];
            }
        } catch (ExceptionInterface $e) {
            $this->errors[] = $e->getMessage();
        }

        return [];
    }

    public static function getLabel(): string
    {
        return 'music';
    }
}
