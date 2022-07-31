<?php

return [
    'routes' => [
        ['name' => 'Main#Index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'Main#Upload', 'url' => '/upload', 'verb' => 'POST'],
        ['name' => 'Main#getCounters', 'url' => '/counters', 'verb' => 'GET'],
        ['name' => 'main#Download', 'url' => '/new', 'verb' => 'POST'],
        ['name' => 'Aria2#Action', 'url' => '/aria2/{path}', 'verb' => 'POST'],
        ['name' => 'Aria2#getStatus', 'url' => '/status/{path}', 'verb' => 'POST'],
        ['name' => 'Main#scanFolder', 'url' => '/scanfolder', 'verb' => 'POST'],
        ['name' => 'Ytdl#Index', 'url' => '/ytdl/get', 'verb' => 'POST'],
        ['name' => 'Ytdl#Download', 'url' => '/ytdl/new', 'verb' => 'POST'],
        ['name' => 'Ytdl#Delete', 'url' => '/ytdl/delete', 'verb' => 'POST'],
        ['name' => 'Ytdl#Redownload', 'url' => '/ytdl/redownload', 'verb' => 'POST'],
        ['name' => 'Search#Execute', 'url' => '/search', 'verb' => 'POST'],
        // AdminSettings
        ['name' => 'Settings#saveAdmin', 'url' => '/admin/save', 'verb' => 'POST'],
        ['name' => 'Settings#saveGlobalAria2', 'url' => '/admin/aria2/save', 'verb' => 'POST'],
        ['name' => 'Settings#getGlobalAria2', 'url' => '/admin/aria2/get', 'verb' => 'GET'],
        // PersonalSettings
        ['name' => 'Settings#saveCustom', 'url' => '/personal/save', 'verb' => 'POST'],
        ['name' => 'Settings#getCustomAria2', 'url' => '/personal/aria2/get', 'verb' => 'POST'],
        ['name' => 'Settings#saveCustomAria2', 'url' => '/personal/aria2/save', 'verb' => 'POST'],
        ['name' => 'Settings#deleteCustomAria2', 'url' => '/personal/aria2/delete', 'verb' => 'POST'],
        ['name' => 'Settings#getYtdl', 'url' => '/personal/ytdl/get', 'verb' => 'POST'],
        ['name' => 'Settings#saveYtdl', 'url' => '/personal/ytdl/save', 'verb' => 'POST'],
        ['name' => 'Settings#deleteYtdl', 'url' => '/personal/ytdl/delete', 'verb' => 'POST'],
        ['name' => 'Settings#getSettings', 'url' => '/getsettings', 'verb' => 'POST'],
    ],
];
