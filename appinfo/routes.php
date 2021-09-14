<?php

return [
    'routes' => [
        ['name' => 'Main#Index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'main#Download', 'url' => '/new', 'verb' => 'POST'],
        ['name' => 'Aria2#Action', 'url' => '/aria2/{path}', 'verb' => 'POST'],
        ['name' => 'Aria2#getStatus', 'url' => '/status/{path}', 'verb' => 'POST'],
        ['name' => 'Aria2#Update', 'url' => '/update', 'verb' => 'GET'],
        ['name' => 'Youtube#Index', 'url' => '/youtube/get', 'verb' => 'POST'],
        ['name' => 'Youtube#Download', 'url' => '/youtube/new', 'verb' => 'POST'],
        ['name' => 'Youtube#Delete', 'url' => '/youtube/delete', 'verb' => 'POST'],
        ['name' => 'Search#Execute', 'url' => '/search', 'verb' => 'POST'],
        // AdminSettings
        ['name' => 'Settings#Admin', 'url' => '/admin/save', 'verb' => 'POST'],
        // PersonalSettings
        ['name' => 'Settings#Personal', 'url' => '/personal/save', 'verb' => 'POST'],
        ['name' => 'Settings#aria2Get', 'url' => '/personal/aria2/get', 'verb' => 'POST'],
        ['name' => 'Settings#aria2Save', 'url' => '/personal/aria2/save', 'verb' => 'POST'],
        ['name' => 'Settings#aria2Delete', 'url' => '/personal/aria2/delete', 'verb' => 'POST'],

    ],
];
