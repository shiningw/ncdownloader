<?php

namespace OCA\NCDownloader\Controller;

use \OCP\AppFramework\ApiController as API;
use \OCP\IRequest;
use \OCP\AppFramework\Http\JSONResponse;
use \OCP\IL10N;
use OCA\NCDownloader\Controller\MainController as Main;
use OCA\NCDownloader\Controller\YtdlController as YTD;
use OCA\NCDownloader\Controller\SearchController as Search;

class ApiController extends API
{

    private $IL10N;
    private $ytdl;
    private $main;
    private $search;

    public function __construct($appName, IRequest $request, IL10N $IL10N, YTD $ytdl, Main $main, Search $search)
    {
        $this->IL10N = $IL10N;
        $this->main = $main;
        $this->search = $search;
        $this->ytdl = $ytdl;
        parent::__construct($appName, $request);
    }

    /**
     * @CORS
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function download(string $url, string $type = "aria2", array $options = []): JSONResponse
    {
        if ($type == "aria2") {
            return $this->main->Download($url);
        } else if ($type == "ytdl") {
            $extension = $options["extension"] ?? "mp4";
            return $this->ytdl->Download($url, $extension);
        } else if ($type == "bt") {
            return $this->main->Upload();
        }
        return new JSONResponse(["error" => "Invalid download type"]);
    }

    /**
     * @CORS
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function search(string $keyword, string $site = "TPB"): JSONResponse
    {
        return $this->search->execute($keyword, $site);
    }
}
