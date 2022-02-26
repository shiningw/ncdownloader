<?php

namespace OCA\NCDownloader\Search\Sites;

interface searchInterface
{
    public function search(string $keyword):array;
    public function getRows():array;
    public function getTableTitles():array;
}
