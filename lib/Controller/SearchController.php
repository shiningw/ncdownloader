<?php

namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Search\siteSearch;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\IRequest;
use OCA\NCDownloader\Tools\Helper;

class SearchController extends Controller
{
    private $uid;
    private $settings = null;
    //@config OC\AppConfig
    private $l10n;
    private $urlGenerator;
    private $search;


    public function __construct($appName, IRequest $request, $UserId)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->urlGenerator = \OC::$server->get(\OCP\IURLGenerator::class);
        $this->search = new siteSearch();
    }
    
    #[NoAdminRequired]
    public function execute(string $keyword,string $site = "TPB", int $page = 1, int $perPage = 25)
    {
        $keyword = Helper::sanitize($keyword);
        $site = Helper::sanitize($site);
        $page = max(1, $page);
        $perPage = min(100, max(10, $perPage));
        $this->search->setSite($site);
        $data = $this->search->go($keyword, $page, $perPage);
        return new JSONResponse($data);
    }
}
