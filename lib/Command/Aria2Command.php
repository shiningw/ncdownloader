<?php

namespace OCA\NCDownloader\Command;

use OCA\NCDownloader\Db\Helper as DbHelper;
use OCA\NCDownloader\Tools\Helper;
use OC\Core\Command\Base;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class Aria2Command {
    protected $dbconn;

    public function __construct($dbconn) {
        $this->dbconn = $dbconn;
    }
    protected function configure()
    {
        $this->setName('aria2')
            ->setDescription('Aria2 hooks')
            ->addArgument(
                'action',
                InputArgument::OPTIONAL,
                'Aria2 hook names: start,complete,error'
            )->addArgument(
            'gid',
            InputArgument::OPTIONAL,
            'Aria2 gid'
        )->addArgument(
            'path',
            InputArgument::OPTIONAL,
            'Downloaded file path'
        )->addArgument(
            'numFiles',
            InputArgument::OPTIONAL,
            'Number of Files',
            1
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        if (!$action = $input->getArgument('action')) {
            $action = 'start';
        }

        $gid = $input->getArgument('gid');
        if (!is_string($gid)) {
            return 0;
        }

        if (in_array($action, ['complete', 'error'])) {
            $status = strtoupper($action);
            $this->dbconn->updateStatus($gid, Helper::STATUS[$status]);
        }
        if ($action === 'start') {
            if ($path = $input->getArgument('path')) {
                $filename = basename($path);
                $this->dbconn->updateFilename($gid,$filename);
            }

        }
        return 1;
    }

}
