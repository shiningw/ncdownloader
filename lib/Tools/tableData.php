<?php
namespace OCA\NCDownloader\Tools;

class tableData
{
    protected $row, $title = [];
    private $error = null;

    public function __construct(array $titles = [], $rows = [])
    {
        $this->title = $titles;
        $this->row = $rows;
    }

    public static function create(array $titles = [], $rows = [])
    {
        return new static($titles, $rows);
    }

    public function setError(string $error)
    {
        $this->error = $error;
        return $this;
    }
    public function getError(): string
    {
        return $this->error;
    }

    public function hasError(): bool
    {
        return isset($this->error);
    }

    public function getData(): array
    {
        return ["title" => $this->title, "row" => $this->row];
    }
}
