<?php

namespace OCA\NCDownloader\AppInfo;

\OC::$server->getNavigationManager()->add([
    'id' => 'ncdownloader',
    'order' => 10,
    'href' => \OC::$server->getURLGenerator()->linkToRoute('ncdownloader.Main.Index'),
    'icon' => \OC::$server->getURLGenerator()->imagePath('ncdownloader', 'ncdownloader.svg'),
    'name' => 'ncdownloader'
]);

