<?php

namespace OCA\NCDownloader\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Settings\ISettings;
use OCA\NCDownloader\Db\Settings;
use OCA\NCDownloader\Tools\Helper;


class Admin implements ISettings
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
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm()
	{
		$settings = Helper::getAllAdminSettings();
		$settings +=  [
			"path" => "/apps/ncdownloader/admin/save",
			"aria2_version" => Helper::getAria2Version(),
			"ytdl_version" => Helper::getYtdlVersion(),
		];
		$parameters = [
			'settings' => $settings,
			'options' => Helper::getAdminOptions($settings),
		];
		return new TemplateResponse('ncdownloader', 'settings/Admin', $parameters, '');
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
		return 0;
	}
}
