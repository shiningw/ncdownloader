<?php

namespace OCA\Vapor\Search\Sites;
use OCA\Vapor\Tools\tableData;

interface searchInterface
{
    public function search(string $keyword):tableData;
    public function getRows():array;
    public function getTableTitles():array;
}
