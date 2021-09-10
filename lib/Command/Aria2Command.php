<?php
/**
 * @copyright Copyright (c) 2016, ownCloud, Inc.
 *
 * @author Joas Schilling <coding@schilljs.com>
 * @author Robin Appelman <robin@icewind.nl>
 *
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program. If not, see <http://www.gnu.org/licenses/>
 *
 */
namespace OCA\NCDownloader\Command;

use OCA\NCDownloader\Tools\Aria2;
use OCA\NCDownloader\Tools\DBConn;
use OCA\NCDownloader\Tools\File;
use OCA\NCDownloader\Tools\Helper;
use OC\Core\Command\Base;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class Aria2Command extends base
{
    public function __construct()
    {
        $this->conn = new DBConn();
        $this->aria2 = new Aria2();
        parent::__construct();
    }
    protected function configure()
    {
        $this
            ->setName('aria2')
            ->setDescription('Aria2 hooks')
            ->addArgument(
                'action',
                InputArgument::OPTIONAL,
                'Aria2 hook names: start,complete,error'
            )->addOption(
            'gid',
            'g',
            InputOption::VALUE_REQUIRED,
            'Aria2 gid'
        )->addOption(
            'path',
            'p',
            InputOption::VALUE_OPTIONAL,
            'Downloaded file path',
        )->addOption(
            'number',
            'N',
            InputOption::VALUE_OPTIONAL,
            'Number of Files',
            1
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        if (!$action = $input->getArgument('action')) {
            $action = 'start';
        }
        $gid = $input->getOption('gid');
        $path = $input->getOption('path');
        $numFile = $input->getOption('number');
        if (!$gid) {
            return 1;
        }
        $parent_gid = $this->aria2->getFollowingGid($gid); // $this->conn->getAll();
        if ($parent_gid) {
            $tablename = $this->conn->queryBuilder->getTableName("ncdownloader_info");
            $sql = sprintf("UPDATE %s set followedby = ? WHERE gid = ?", $tablename);
           // $data = serialize(['followedby' => "82140bd962946ae0"]);
            $this->conn->execute($sql, [$gid, $parent_gid]);
        }

        $result = $this->conn->getByGid($parent_gid);
        //$data = unserialize($result['data']);
        $output->writeln(print_r($result, true));
        return 0;
    }
}
