<?php

namespace OCA\NCDownloader\Search;

require __DIR__ . "/../../vendor/autoload.php";

use OCP\AppFramework\QueryException;
use OCP\IServerContainer;
use Symfony\Component\HttpClient\Exception\ClientException;

class siteSearch
{
    public $container;
    private $site = null;
    private $defaultSite = __NAMESPACE__ . '\Sites\TPB';
    public function __construct()
    {
        $this->container = \OC::$server->query(IServerContainer::class);
        $this->site = __NAMESPACE__ . '\Sites\TPB';
    }
    public function go($keyword): array
    {
        try {
            $siteInst = $this->container->query($this->site);
        } catch (QueryException $e) {
            $siteInst = $this->container->query($this->defaultSite);
        } catch (ClientException $e) {
            return ['error' => $e->getMessage()];
        }
        $result = $siteInst->search($keyword);
        if ($result->hasError()) {
            return ['error' => $result->getError()];
        }
        return $result->getData();
    }

    public function setSite($site)
    {
        if (strpos($site, '\\') !== false) {
            $this->site = $site;
        } else {
            $this->site = __NAMESPACE__ . '\Sites\\' . $site;
        }
    }
}
