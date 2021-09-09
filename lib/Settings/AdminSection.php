<?php

declare(strict_types=1);

namespace OCA\NcDownloader\Settings;

use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class AdminSection implements IIconSection {

	/** @var IL10N */
	private $l;

	/** @var IURLGenerator */
	private $urlGenerator;

	public function __construct(IL10N $l, IURLGenerator $urlGenerator) {
		$this->l = $l;
		$this->urlGenerator = $urlGenerator;
	}

	public function getIcon(): string {
		return $this->urlGenerator->imagePath('core', 'actions/settings-dark.svg');
	}

	public function getID(): string {
		return 'ncdownloader';
	}

	public function getName(): string {
		return $this->l->t('Downloader Settings');
	}

	public function getPriority(): int {
		return 100;
	}
}
