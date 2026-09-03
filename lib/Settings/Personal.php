<?php

namespace OCA\Vapor\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;
use OCP\IDBConnection;
// BEGIN STEVE EDITS
use OCP\IUserSession;
// END STEVE EDITS
use OCP\Settings\ISettings;
use OCA\Vapor\Db\Settings;
use OCA\Vapor\Tools\Helper;
use OCP\IL10N;


class Personal implements ISettings
{

	/** @var IDBConnection */
	private $connection;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var IConfig */
	private $config;
	private $uid;
	private $settings;
        private $l10n;

	public function __construct(
		IDBConnection $connection,
		ITimeFactory $timeFactory,
		IConfig $config,
		// BEGIN STEVE EDITS
		IUserSession $userSession,
		// END STEVE EDITS
                IL10N $l10n
	) {
		$this->connection = $connection;
		$this->timeFactory = $timeFactory;
		$this->config = $config;
		//$this->uid = \OC::$server->getUserSession()->getUser()->getUID();
		// BEGIN STEVE EDITS
		$this->uid = $userSession->getUser()->getUID();
		// END STEVE EDITS
		$this->settings = new Settings($this->uid);
                $this->l10n = $l10n;
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm()
	{
		$path = '/apps/vapor/personal/save';
		$parameters = [
			"settings" => [
				"ncd_downloader_dir" => Helper::getDownloadDir(),
				"ncd_torrents_dir" => $this->settings->get("ncd_torrents_dir"),
				"ncd_seed_ratio" => $this->settings->get("ncd_seed_ratio"),
				'ncd_seed_time_unit' => $this->settings->get("ncd_seed_time_unit"),
				'ncd_seed_time' => $this->settings->get("ncd_seed_time"),
				"path" => $path,
				"disallow_aria2_settings" => Helper::getAdminSettings("disallow_aria2_settings"),
				"is_admin" => \OC_User::isAdminUser($this->uid),
			],
			"options" => [
				[
					"label" => $this->l10n->t("Downloads Folder : "),
					"id" => "ncd_downloader_dir",
					"value" => Helper::getDownloadDir(),
					"placeholder" => Helper::getDownloadDir() ?? "/downloads",
					"path"    => $path,
				],
				[
					"label" => $this->l10n->t("Torrents Folder : "),
					"id" => "ncd_torrents_dir",
					"value" => $this->settings->get("ncd_torrents_dir"),
					"placeholder" => $this->settings->get("ncd_torrents_dir") ?? "/torrents",
					"path" => $path,
				]
			]
		];

		//\OC_Util::addScript($this->appName, 'common');
		//\OC_Util::addScript($this->appName, 'settings/personal');
		//file_put_contents("/tmp/re.log",print_r($parameters,true));
		return new TemplateResponse('vapor', 'settings/Personal', $parameters, '');
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
		return 100;
	}
}
