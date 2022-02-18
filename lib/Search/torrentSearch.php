<?php

namespace OCA\NCDownloader\Search;

require __DIR__ . "/../../vendor/autoload.php";
use OCP\AppFramework\QueryException;
use OCP\IServerContainer;
use Symfony\Component\HttpClient\Exception\ClientException;

class torrentSearch
{
    public $container;
    private $site = null;
    private $defaultSite = __NAMESPACE__ . '\Sites\TPB';
    public function __construct()
    {
        $this->container = \OC::$server->query(IServerContainer::class);
        $this->site = __NAMESPACE__ . '\Sites\TPB';
    }
    public function go($keyword)
    {
        try {
            $siteInst = $this->container->query($this->site);
        } catch (QueryException $e) {
            $siteInst = $this->container->query($this->defaultSite);
        } catch (ClientException $e) {
            return ['message', $e->getMessage()];
        }
        $data = $siteInst->search($keyword);
        $this->addAction($data);
        return $data;
    }

    public function setSite($site)
    {
        if (strpos($site, '\\') !== false) {
            $this->site = $site;
        } else {
            $this->site = __NAMESPACE__ . '\Sites\\' . $site;
        }
    }

    private function addAction(&$data)
    {
        foreach ($data as $key => &$value) {
            if (!$value) {
                continue;
            }
            $value['actions'] = [["name" => 'download', 'path' => '/index.php/apps/ncdownloader/new'], ['name' => 'clipboard']];
        }
    }

}
