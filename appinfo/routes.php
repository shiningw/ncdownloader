<?php
/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\NcDownloader\Controller\Aria2Controller->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'routes' => [
	   ['name' => 'Main#Index', 'url' => '/', 'verb' => 'GET'],
       ['name' => 'main#newDownload', 'url' => '/new', 'verb' => 'POST'],
       ['name' => 'Aria2#Action', 'url' => '/aria2/{path}', 'verb' => 'POST'],
       ['name' => 'Aria2#getStatus', 'url' => '/status/{path}', 'verb' => 'POST'],
       ['name' => 'Aria2#Update', 'url' => '/update', 'verb' => 'GET'],
       //['name' => 'main#checkStatus', 'url' => '/checkstatus', 'verb' => 'POST'],
       // AdminSettings
       ['name' => 'Settings#Admin', 'url' => '/admin/save', 'verb' => 'POST'],
       // PersonalSettings
       ['name' => 'Settings#Personal', 'url' => '/personal/save', 'verb' => 'POST'],
       ['name' => 'Settings#aria2Get', 'url' => '/personal/aria2/get', 'verb' => 'POST'],
       ['name' => 'Settings#aria2Save', 'url' => '/personal/aria2/save', 'verb' => 'POST'],
       ['name' => 'Settings#aria2Delete', 'url' => '/personal/aria2/delete', 'verb' => 'POST'],

    ]
];

