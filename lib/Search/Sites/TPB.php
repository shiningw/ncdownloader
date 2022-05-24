<?php

namespace OCA\NCDownloader\Search\Sites;

use OCA\NCDownloader\Tools\tableData;

//The Piratebay
class TPB extends searchBase implements searchInterface
{
    //html content
    private $content = null;
    public $baseUrl = "https://piratebay.live/search/";

    public function __construct($crawler, $client)
    {
        $this->client = $client;
        $this->crawler = $crawler;
    }
    public function search(string $keyword): tableData
    {
        $this->searchUrl = $this->baseUrl . trim($keyword);
        $this->crawler->add($this->getContent());
        $this->getItems()->addActionLinks();
        if ($this->hasErrors()) {
            return tableData::create()->setError($this->getErrors());
        }
        return tableData::create($this->getTableTitles(), $this->getRows());
    }
    public function setContent($content)
    {
        $this->content = $content;
    }
    public function getContent()
    {
        if ($this->content) {
            return $this->content;
        }
        try {
            $response = $this->client->request('GET', $this->searchUrl);
            $content = $response->getContent();
        } catch (\Exception $e) {
            $this->errors[] = $e->getMessage();
            return [];
        }
        return $content;
    }
    public function parse()
    {
        $data = $this->crawler->filter("#searchResult tr")->each(function ($node, $i) {

            if ($node->getNode(0)) {
                try {
                    $title = $node->filter("a.detLink")->text();
                    $info = $node->filter("font.detDesc")->text();
                    $numSeeders = $node->filter("td:nth-child(3)")->text();
                    $magnetLink = $node->filter("td:nth-child(2) > a:nth-child(2)")->attr("href");
                    $parts = explode(',', $info);
                    $info = $parts[0] . "-" . $parts[1];
                    return ['title' => $title, 'data-link' => $magnetLink, 'seeders' => $numSeeders, 'info' => $info];
                } catch (\Exception $e) {
                    //echo $e->getMessage();
                }
            }

        });
        return $data;
    }
    public function getItems()
    {
        $this->rows = $this->parse();
        return $this;
    }
    public static function getLabel(): string
    {
        return 'thepiratebay';
    }
}
