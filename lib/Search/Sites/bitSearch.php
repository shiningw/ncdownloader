<?php

namespace OCA\NCDownloader\Search\Sites;

use OCA\NCDownloader\Tools\Helper;
use OCA\NCDownloader\Tools\tableData;

//bitsearch.to
class bitSearch extends searchBase implements searchInterface
{
    //html content
    private $content = null;
    private $currentPage = 1;
    private $totalResults = 0;
    private $perPage = 20;
    private $upstreamPageSize = 20;
    private $perPageOptions = [20];
    private $hasNextPage = false;
    public $baseUrl = "https://bitsearch.to/search";
    protected $query = null;
    protected $tableTitles = [];

    public function __construct($crawler, $client)
    {
        $this->client = $client;
        $this->crawler = $crawler;
        $this->baseUrl = $this->resolveBaseUrl();
    }

    private function resolveBaseUrl(): string
    {
        $url = trim((string) Helper::getAdminSettings('ncd_bitsearch_url'));
        if ($url === '') {
            return 'https://bitsearch.to/search';
        }

        if (!preg_match('/^https?:\/\//i', $url)) {
            $url = 'https://' . $url;
        }

        return rtrim($url, '/');
    }
    public function search(string $keyword): tableData
    {
        $this->query = ['q' => trim($keyword), 'sort' => 'seeders', 'page' => $this->currentPage];
        $this->searchUrl = $this->baseUrl;
        $content = $this->getContent($this->currentPage);

        if ($this->hasErrors()) {
            return tableData::create()->setError($this->getErrors());
        }

        $this->totalResults = $this->extractTotalResults((string) $content);
    $this->hasNextPage = $this->detectHasNextPage((string) $content);
        $this->rows = array_values(array_filter($this->parseContent((string) $content)));
        $this->addActionLinks();

        return tableData::create($this->getTableTitles(), $this->getRows())
            ->setMeta([
                'pagination' => [
                    'total' => $this->totalResults,
                    'page' => $this->currentPage,
                    'perPage' => $this->perPage,
                    'perPageOptions' => $this->perPageOptions,
                    'hasNext' => $this->hasNextPage,
                ],
            ]);
    }

    private function extractTotalResults(string $content): int
    {
        if ($content === '') {
            return 0;
        }

        $decoded = html_entity_decode($content, ENT_QUOTES | ENT_HTML5);
        if (preg_match('/Found\s*<span[^>]*>\s*([0-9\,\.]+)\s*<\/span>\s*result(?:s)?/i', $decoded, $matches)) {
            return (int) preg_replace('/[^0-9]/', '', $matches[1]);
        }

        return 0;
    }

    private function detectHasNextPage(string $content): bool
    {
        if ($content === '') {
            return false;
        }

        $decoded = html_entity_decode($content, ENT_QUOTES | ENT_HTML5);
        $nextPage = $this->currentPage + 1;

        return (bool) preg_match('/href="[^\"]*page=' . $nextPage . '(?:[^0-9]|\"|$)[^\"]*"/i', $decoded);
    }

    public function setPage(int $page): self
    {
        $this->currentPage = max(1, $page);
        return $this;
    }

    public function setPerPage(int $perPage): self
    {
        $this->perPage = $this->upstreamPageSize;
        return $this;
    }
    public function setContent($content)
    {
        $this->content = $content;
    }
    public function getContent(int $page = 1)
    {
        if ($this->content && $page === 1) {
            return $this->content;
        }
        try {
            $query = $this->query;
            $query['page'] = max(1, $page);
            $response = $this->client->request('GET', $this->searchUrl, ['query' => $query]);
            $statusCode = $response->getStatusCode();
            $content = $response->getContent(false);

            if ($statusCode === 429) {
                $this->errors[] = 'BitSearch rate limit reached. Please wait a minute and try again.';
                return '';
            }

            if ($statusCode >= 400) {
                $this->errors[] = sprintf('BitSearch returned HTTP %d. Please try again later.', $statusCode);
                return '';
            }
        } catch (\Exception $e) {
            $code = (int) $e->getCode();
            if ($code === 429) {
                $this->errors[] = 'BitSearch rate limit reached. Please wait a minute and try again.';
            } else {
                $this->errors[] = 'Unable to reach BitSearch right now. Please try again later.';
            }
            return '';
        }
        return $content;
    }

    private function parseContent(string $content): array
    {
        $crawler = new \Symfony\Component\DomCrawler\Crawler($content);
        $cards = $crawler->filter('div.space-y-4 > div.bg-white.rounded-lg.shadow-sm.border.border-gray-200.p-6');
        if ($cards->count() > 0) {
            return array_values(array_filter($cards->each(function ($node) {
                try {
                    $title = trim($node->filter('h3 a[href*="/torrent/"]')->first()->text());
                    $magnetLink = $node->filter('a[href^="magnet:?"]')->first()->attr('href');

                    $seeders = 0;
                    $seedersNode = $node->filter('span.text-green-600 span.font-medium')->first();
                    if ($seedersNode->count() > 0) {
                        $seeders = trim($seedersNode->text());
                    }

                    $size = '';
                    $date = '';
                    $stats = $node->filter('div.text-sm.text-gray-600.mb-3 > span.inline-flex');
                    foreach ($stats as $stat) {
                        $statCrawler = new \Symfony\Component\DomCrawler\Crawler($stat);
                        if ($statCrawler->filter('i.fa-download')->count() > 0) {
                            $size = trim($statCrawler->filter('span')->last()->text(''));
                        }
                        if ($statCrawler->filter('i.fa-calendar')->count() > 0) {
                            $date = trim($statCrawler->filter('span')->last()->text(''));
                        }
                    }

                    $info = trim(sprintf('%s on %s', $size, $date));
                    return ['title' => $title, 'data-link' => $magnetLink, 'seeders' => $seeders, 'info' => $info];
                } catch (\Exception $e) {
                    return null;
                }
            })));
        }

        // Legacy BitSearch layout fallback.
        return array_values(array_filter($crawler->filter('.search-result')->each(function ($node) {
            if (!$node->getNode(0)) {
                return null;
            }
            try {
                $title = $node->filter('.info h5.title')->text();
                $infoNode = $node->filter('.info .stats div');
                $count = $infoNode->count();
                $info = [];
                for ($i = 0; $i < $count; $i++) {
                    $name = strtolower($infoNode->filter('img')->eq($i)->attr('alt'));
                    $info[$name] = trim($infoNode->eq($i)->text());
                }
                $seeders = $info['seeder'] ?? 0;
                $infoText = sprintf('%s on %s', $info['size'] ?? '', $info['date'] ?? '');
                $magnetLink = $node->filter('.links.center-flex a:nth-child(2)')->attr('href');
                return ['title' => $title, 'data-link' => $magnetLink, 'seeders' => $seeders, 'info' => $infoText];
            } catch (\Exception $e) {
                return null;
            }
        })));
    }

    public function parse()
    {
        $cards = $this->crawler->filter('div.space-y-4 > div.bg-white.rounded-lg.shadow-sm.border.border-gray-200.p-6');
        if ($cards->count() > 0) {
            return $cards->each(function ($node) {
                try {
                    $title = trim($node->filter('h3 a[href*="/torrent/"]')->first()->text());
                    $magnetLink = $node->filter('a[href^="magnet:?"]')->first()->attr('href');

                    $seeders = 0;
                    $seedersNode = $node->filter('span.text-green-600 span.font-medium')->first();
                    if ($seedersNode->count() > 0) {
                        $seeders = trim($seedersNode->text());
                    }

                    $size = '';
                    $date = '';
                    $stats = $node->filter('div.text-sm.text-gray-600.mb-3 > span.inline-flex');
                    foreach ($stats as $stat) {
                        $crawler = new \Symfony\Component\DomCrawler\Crawler($stat);
                        if ($crawler->filter('i.fa-download')->count() > 0) {
                            $size = trim($crawler->filter('span')->last()->text(''));
                        }
                        if ($crawler->filter('i.fa-calendar')->count() > 0) {
                            $date = trim($crawler->filter('span')->last()->text(''));
                        }
                    }

                    $info = trim(sprintf('%s on %s', $size, $date));
                    return ['title' => $title, 'data-link' => $magnetLink, 'seeders' => $seeders, 'info' => $info];
                } catch (\Exception $e) {
                    return null;
                }
            });
        }

        // Legacy BitSearch layout fallback.
        return $this->crawler->filter('.search-result')->each(function ($node) {
            if (!$node->getNode(0)) {
                return null;
            }
            try {
                $title = $node->filter('.info h5.title')->text();
                $infoNode = $node->filter('.info .stats div');
                $count = $infoNode->count();
                $info = [];
                for ($i = 0; $i < $count; $i++) {
                    $name = strtolower($infoNode->filter('img')->eq($i)->attr('alt'));
                    $info[$name] = trim($infoNode->eq($i)->text());
                }
                $seeders = $info['seeder'] ?? 0;
                $infoText = sprintf('%s on %s', $info['size'] ?? '', $info['date'] ?? '');
                $magnetLink = $node->filter('.links.center-flex a:nth-child(2)')->attr('href');
                return ['title' => $title, 'data-link' => $magnetLink, 'seeders' => $seeders, 'info' => $infoText];
            } catch (\Exception $e) {
                return null;
            }
        });
    }
    public function getItems()
    {
        $this->rows = array_values(array_filter($this->parse()));
        return $this;
    }
    public static function getLabel(): string
    {
        return 'bitsearch';
    }
}
