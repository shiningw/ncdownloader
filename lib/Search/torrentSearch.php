<?php

namespace OCA\NCDownloader\Search;

require __DIR__ . "/../../vendor/autoload.php";
use OCA\NCDownloader\Search\Sites\TPB;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

class torrentSearch
{

    public static function go($keyword)
    {
        $client = HttpClient::create();
        $crawler = new Crawler();
        $tpb = new TPB($crawler, $client);
        $data = $tpb->search($keyword);
        self::addAction($data);
        return $data;
    }

    private static function addAction(&$data)
    {
        foreach ($data as $key => &$value) {
            if (!$value) {
                continue;
            }
            $value['actions'][] = array("name" => 'download', 'path' => '/index.php/apps/ncdownloader/new');
        }
    }

}
