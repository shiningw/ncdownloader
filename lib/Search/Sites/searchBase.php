<?php

namespace OCA\NCDownloader\Search\Sites;

abstract class searchBase
{
    protected $query = null;
    protected $tableTitles = [];
    protected $rows = [];
    protected $errors = [];
    protected $actionLinks = [["name" => 'download', 'path' => '/index.php/apps/ncdownloader/new'], ['name' => 'clipboard']];
    private static $instance = null;

    public function getTableTitles(): array
    {
        if (empty($this->tableTitles)) {
            return ['title', 'seeders', 'info', 'actions'];
        }
        return $this->tableTitles;
    }

    public static function create($crawler,$client)
    {

        if (!self::$instance) {
            self::$instance = new static($crawler,$client);
        }

        return self::$instance;
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

    public function hasErrors(): bool
    {
        return (bool) (count($this->errors) > 0);
    }

    public function getErrors(): string
    {
        return implode(",", $this->errors);
    }

}
