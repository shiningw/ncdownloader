<?php

namespace OCA\NCDownloader\Search\Sites;

abstract class searchBase
{
    protected $query = null;
    protected $tableTitles = [];
    protected $rows = [];
    protected $actionLinks = [["name" => 'download', 'path' => '/index.php/apps/ncdownloader/new'], ['name' => 'clipboard']];

    public function getTableTitles(): array
    {
        if (empty($this->tableTitles)) {
            return ['title', 'seeders', 'info', 'actions'];
        }
        return $this->tableTitles;
    }

    public function setTableTitles(array $titles)
    {
        $this->tableTitles = $titles;
        return $this;
    }

    protected function addActionLinks(?array $links)
    {
        $links = $links ?? $this->actionLinks;
        foreach ($this->rows as $key => &$value) {
            if (!$value) {
                continue;
            }
            $value['actions'] = $links;
        }
    }
    public function getRows(): array
    {
        return $this->rows;
    }

}
