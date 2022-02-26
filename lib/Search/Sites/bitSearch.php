<?php

namespace OCA\NCDownloader\Search\Sites;

//bitsearch.to
class bitSearch extends searchBase implements searchInterface
{
    //html content
    private $content = null;
    public $baseUrl = "https://bitsearch.to/search";
    protected $query = null;
    protected $tableTitles = [];

    public function __construct($crawler, $client)
    {
        $this->client = $client;
        $this->crawler = $crawler;
    }
    public function search(string $keyword): array
    {
        $this->query = ['q' => trim($keyword), 'sort' => 'seeders'];
        $this->searchUrl = $this->baseUrl;
        $this->crawler->add($this->getContent());
        $this->getItems()->addActionLinks(null);
        return ['title' =>$this->getTableTitles(), 'row' => $this->getRows()];
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
        $response = $this->client->request('GET', $this->searchUrl, ['query' => $this->query]);
        return $response->getContent();
    }

    public function parse()
    {

        $data = $this->crawler->filter(".search-result")->each(function ($node, $i) {

            if ($node->getNode(0)) {
                try {
                    $title = $node->filter(".info h5.title")->text();
                    $infoNode = $node->filter(".info .stats div");
                    $count = $infoNode->count();
                    $info = [];
                    for ($i = 0; $i < $count; $i++) {
                        $name = strtolower($infoNode->filter("img")->eq($i)->attr("alt"));
                        $info[$name] = trim($infoNode->eq($i)->text());
                    }
                    $seeders = $info['seeder'];
                    $info = sprintf("%s on %s", $info['size'], $info['date']);
                    $magnetLink = $node->filter(".links.center-flex a:nth-child(2)")->attr("href");
                    return ['title' => $title, 'data-link' => $magnetLink, 'seeders' => $seeders, 'info' => $info];
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
}
