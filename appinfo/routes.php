<?php

return [
    'routes' => [
        ['name' => 'Main#Index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'Main#Upload', 'url' => '/upload', 'verb' => 'POST'],
        ['name' => 'Main#getCounters', 'url' => '/counters', 'verb' => 'GET'],
        ['name' => 'main#Download', 'url' => '/new', 'verb' => 'POST'],
        ['name' => 'Aria2#Action', 'url' => '/aria2/{path}', 'verb' => 'POST'],
        ['name' => 'Aria2#getStatus', 'url' => '/status/{path}', 'verb' => 'POST'],
        ['name' => 'Main#scanFolder', 'url' => '/scanfolder', 'verb' => 'GET'],
        ['name' => 'Youtube#Index', 'url' => '/youtube/get', 'verb' => 'POST'],
        ['name' => 'Youtube#Download', 'url' => '/youtube/new', 'verb' => 'POST'],
        ['name' => 'Youtube#Delete', 'url' => '/youtube/delete', 'verb' => 'POST'],
        ['name' => 'Youtube#Redownload', 'url' => '/youtube/redownload', 'verb' => 'POST'],
        ['name' => 'Search#Execute', 'url' => '/search', 'verb' => 'POST'],
        // AdminSettings
        ['name' => 'Settings#Admin', 'url' => '/admin/save', 'verb' => 'POST'],
        // PersonalSettings
        ['name' => 'Settings#Personal', 'url' => '/personal/save', 'verb' => 'POST'],
        ['name' => 'Settings#aria2Get', 'url' => '/personal/aria2/get', 'verb' => 'POST'],
        ['name' => 'Settings#aria2Save', 'url' => '/personal/aria2/save', 'verb' => 'POST'],
        ['name' => 'Settings#aria2Delete', 'url' => '/personal/aria2/delete', 'verb' => 'POST'],
        ['name' => 'Settings#youtubeGet', 'url' => '/personal/youtube-dl/get', 'verb' => 'POST'],
        ['name' => 'Settings#youtubeSave', 'url' => '/personal/youtube-dl/save', 'verb' => 'POST'],
        ['name' => 'Settings#youtubeDelete', 'url' => '/personal/youtube-dl/delete', 'verb' => 'POST'],

    ],
];
