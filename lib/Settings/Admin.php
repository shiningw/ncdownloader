<?php

namespace OCA\Vapor\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Settings\ISettings;
use OCA\Vapor\Db\Settings;
use OCA\Vapor\Tools\Helper;


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
			"path" => "/apps/vapor/admin/save",
			"aria2_version" => Helper::getAria2Version(),
			"ytdl_version" => Helper::getYtdlVersion(),
		];
		$parameters = [
			'settings' => $settings,
			'options' => Helper::getAdminOptions($settings),
		];
		return new TemplateResponse('vapor', 'settings/Admin', $parameters, '');
	}

	/**
	 * @return string the section ID, e.g. 'sharing'
	 */
	public function getSection(): string
	{
		return 'vapor';
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
