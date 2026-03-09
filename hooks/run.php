#!/usr/bin/php

<?php
require __DIR__ . "/../../../3rdparty/autoload.php";
require __DIR__ . "/../lib/Command/.php";
require __DIR__. "/../../../lib/composer/autoload.php";
use OCA\NCDownloader\Command\cmdTool;
use Symfony\Component\Console\Application;

$app = new Application();
$cmd = new cmdTool();
$app->add($cmd);
$app->run();
