<?php

namespace OCA\NCDownloader\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Settings\ISettings;
use OCA\NCDownloader\Db\Settings;
use OCA\NCDownloader\Tools\Helper;

class Personal implements ISettings
{

	/** @var IDBConnection */
	private $connection;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var IConfig */
	private $config;

	public function __construct(
		IDBConnection $connection,
		ITimeFactory $timeFactory,
		IConfig $config
	) {
		$this->connection = $connection;
		$this->timeFactory = $timeFactory;
		$this->config = $config;
		$this->UserId = \OC::$server->getUserSession()->getUser()->getUID();
		$this->settings = new Settings($this->UserId);
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm()
	{
		$parameters = [
			"settings" => [
				"ncd_downloader_dir" => Helper::getDownloadDir(),
				"ncd_torrents_dir" => $this->settings->get("ncd_torrents_dir"),
				"ncd_seed_ratio" => $this->settings->get("ncd_seed_ratio"),
				'ncd_seed_time_unit' => $this->settings->get("ncd_seed_time_unit"),
				'ncd_seed_time' => $this->settings->get("ncd_seed_time"),
				"path" => '/apps/ncdownloader/personal/save',
				"disallow_aria2_settings" => Helper::getAdminSettings("disallow_aria2_settings"),
			]
		];

		//\OC_Util::addScript($this->appName, 'common');
		//\OC_Util::addScript($this->appName, 'settings/personal');
		//file_put_contents("/tmp/re.log",print_r($parameters,true));
		return new TemplateResponse('ncdownloader', 'settings/Personal', $parameters, '');
	}

	/**
	 * @return string the section ID, e.g. 'sharing'
	 */
	public function getSection(): string
	{
		return 'ncdownloader';
	}

	/**
	 * @return int whether the form should be rather on the top or bottom of
	 * the admin section. The forms are arranged in ascending order of the
	 * priority values. It is required to return a value between 0 and 100.
	 *
	 * E.g.: 70
	 */
	public function getPriority(): int
	{
		return 100;
	}
}
