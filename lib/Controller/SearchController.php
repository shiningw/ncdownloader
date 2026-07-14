<?php

namespace OCA\Vapor\Controller;

use OCA\Vapor\Search\siteSearch;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCA\Vapor\Tools\Helper;

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
	// $this->urlGenerator = \OC::$server->getURLGenerator();
	// BEGIN STEVE EDITS
        $this->urlGenerator = \OC::$server->get(\OCP\IURLGenerator::class);
        // END STEVE EDITS
        $this->search = new siteSearch();
    }
    /**
     * @NoAdminRequired
     */
    public function execute(string $keyword,string $site = "TPB")
    {
        $keyword = Helper::sanitize($keyword);
        $site = Helper::sanitize($site);
        $this->search->setSite($site);
        $data = $this->search->go($keyword);
        return new JSONResponse($data);
    }
}
