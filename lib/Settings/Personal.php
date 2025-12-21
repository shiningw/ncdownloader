<?php

namespace OCA\NCDownloader\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\Settings\ISettings;
use OCA\NCDownloader\Db\Settings;
use OCA\NCDownloader\Tools\Helper;

use OCP\IUserManager;

class Personal implements ISettings
{

	/** @var IDBConnection */
	private $connection;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var IConfig */
	private $config;
	/** @var IUserManager */
	private $userManager;
	private $uid;
	private $settings;

	public function __construct(
		IDBConnection $connection,
		ITimeFactory $timeFactory,
		IConfig $config,
		IUserManager $userManager
	) {
		$this->connection = $connection;
		$this->timeFactory = $timeFactory;
		$this->config = $config;
		$this->userManager = $userManager;
		$this->uid = \OC::$server->get(\OCP\IUserSession::class)->getUser()->getUID();
		$this->settings = new Settings($this->uid);
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm()
	{
		$path = '/apps/ncdownloader/personal/save';
		$user = $this->userManager->get($this->uid);
		$groupManager = \OC::$server->get(\OCP\IGroupManager::class);
		$isAdmin = ($user !== null) ? $groupManager->isInGroup($user->getUID(), 'admin') : false;
				$parameters = [
			"settings" => [
				"ncd_downloader_dir" => Helper::getDownloadDir(),
				"ncd_torrents_dir" => $this->settings->get("ncd_torrents_dir"),
				"ncd_seed_ratio" => $this->settings->get("ncd_seed_ratio"),
				'ncd_seed_time_unit' => $this->settings->get("ncd_seed_time_unit"),
				'ncd_seed_time' => $this->settings->get("ncd_seed_time"),
				"path" => $path,
				"disallow_aria2_settings" => Helper::getAdminSettings("disallow_aria2_settings"),
				"is_admin" => $isAdmin,
			],
                        "options" => [
                                [
                                        "label" => "Downloads Folder ",
                                        "id" => "ncd_downloader_dir",
                                        "value" => Helper::getDownloadDir(),
                                        "placeholder" => Helper::getDownloadDir() ?? "/downloads",
                                        "path"    => $path,
                                ],
                                [
                                        "label" => "Torrents Folder",
                                        "id" => "ncd_torrents_dir",
                                        "value" => $this->settings->get("ncd_torrents_dir"),
                                        "placeholder" => $this->settings->get("ncd_torrents_dir") ?? "/torrents",
                                        "path" => $path,
                                ],
                                [
                                        "label" => "VPN start command",
                                        "id" => "ncd_vpn_start",
                                        "value" => $this->settings->get("ncd_vpn_start"),
                                        "placeholder" => "/usr/bin/wg-quick up wg0",
                                        "path" => $path,
                                ],
                                [
                                        "label" => "VPN stop command",
                                        "id" => "ncd_vpn_stop",
                                        "value" => $this->settings->get("ncd_vpn_stop"),
                                        "placeholder" => "/usr/bin/wg-quick down wg0",
                                        "path" => $path,
                                ],
                                [
                                        "label" => "Download Proxy",
                                        "id" => "ncd_download_proxy",
                                        "value" => $this->settings->get("ncd_download_proxy"),
                                        "placeholder" => "socks5://127.0.0.1:1080",
                                        "path" => $path,
                                ]
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
