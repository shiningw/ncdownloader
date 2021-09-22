<?php

namespace OCA\NCDownloader\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Settings\ISettings;
use OCA\NCDownloader\Tools\Settings;

class Admin implements ISettings {

	/** @var IDBConnection */
	private $connection;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var IConfig */
	private $config;

	public function __construct(IDBConnection $connection,
								ITimeFactory $timeFactory,
								IConfig $config) {
		$this->connection = $connection;
		$this->timeFactory = $timeFactory;
		$this->config = $config;
		$this->UserId = \OC::$server->getUserSession()->getUser()->getUID();
		$this->settings = new Settings($this->UserId);
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm() {
		$this->settings->setType($this->settings::TYPE['SYSTEM']);
		$parameters = [
			"path" => "/apps/ncdownloader/admin/save",
			"ncd_yt_binary" => $this->settings->get("ncd_yt_binary"),
			"ncd_aria2_binary" => $this->settings->get("ncd_aria2_binary"),
			"ncd_rpctoken" => $this->settings->get("ncd_rpctoken"),
		];
		return new TemplateResponse('ncdownloader', 'settings/Admin', $parameters, '');
	}

	/**
	 * @return string the section ID, e.g. 'sharing'
	 */
	public function getSection(): string {
		return 'ncdownloader';
	}

	/**
	 * @return int whether the form should be rather on the top or bottom of
	 * the admin section. The forms are arranged in ascending order of the
	 * priority values. It is required to return a value between 0 and 100.
	 *
	 * E.g.: 70
	 */
	public function getPriority(): int {
		return 0;
	}
}
