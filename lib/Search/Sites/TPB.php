<?php

namespace OCA\NcDownloader\Search\Sites;

//The Piratebay
class TPB
{
    //html content
    private $content = null;
    public $baseUrl = "https://piratebay.live/search/";

    public function __construct($crawler, $client)
    {
        $this->client = $client;
        $this->crawler = $crawler;
    }
    public function search($keyword)
    {
        $this->searchUrl = $this->baseUrl . trim($keyword);
        $this->crawler->add($this->getContent());
        return $this->parse();
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
        $response = $this->client->request('GET', $this->searchUrl);
        return $response->getContent();
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
}
