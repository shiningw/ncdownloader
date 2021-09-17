<?php

namespace OCA\NCDownloader\Search;

require __DIR__ . "/../../vendor/autoload.php";
use OCP\IServerContainer;

class torrentSearch
{
    public $container;
    private $site = null;
    public function __construct()
    {
        $this->container = \OC::$server->query(IServerContainer::class);
        $this->site = __NAMESPACE__ . '\Sites\TPB';
    }
    public function go($keyword)
    {
        $siteInst = $this->container->query($this->site);
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
            $value['actions'][] = array("name" => 'download', 'path' => '/index.php/apps/ncdownloader/new');
        }
    }

}
