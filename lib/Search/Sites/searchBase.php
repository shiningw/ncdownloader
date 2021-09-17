<?php

namespace OCA\NCDownloader\Search\Sites;

interface searchBase
{
    public function search($keyword);
    public function parse();

}
