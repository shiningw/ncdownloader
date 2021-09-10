<?php
/**
 * ownCloud - ncdownloader
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE file.
 *
 * @author Xavier Beurois <www.sgc-univ.net>
 * @copyright Xavier Beurois 2015
 */

namespace OCA\NCDownloader\AppInfo;

\OC::$server->getNavigationManager()->add([
    'id' => 'ncdownloader',
    'order' => 10,
    'href' => \OC::$server->getURLGenerator()->linkToRoute('ncdownloader.Main.Index'),
    'icon' => \OC::$server->getURLGenerator()->imagePath('ncdownloader', 'ncdownloader.svg'),
    'name' => 'ncdownloader'
]);

//\OCP\App::registerAdmin('ncdownloader', 'settings/admin');
//\OCP\App::registerPersonal('ncdownloader', 'settings/personal');
