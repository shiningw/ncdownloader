<?php

namespace OCA\NCDownloader\Search\Sites;
use OCA\NCDownloader\Tools\tableData;

interface searchInterface
{
    public function search(string $keyword):tableData;
    public function getRows():array;
    public function getTableTitles():array;
}
