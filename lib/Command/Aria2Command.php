<?php

namespace OCA\Vapor\Command;

use OCA\Vapor\Db\Helper as DbHelper;
use OCA\Vapor\Tools\Helper;
//use OC\Core\Command\Base;
use Symfony\Component\Console\Command\Command as Base;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use OCP\Files\IRootFolder;

class Aria2Command extends Base
{
//    public function __construct()
    private $dbconn;
    public function __construct(\OCP\IDBConnection $connection)
    {
//        $this->dbconn = new DbHelper();

        $this->dbconn = new DbHelper($connection);
        parent::__construct();
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


            // === Automatic scan for complete downloaded torrents  ===
            if ($action === 'complete') {
                $row = $this->dbconn->getByGid($gid);
                if ($row && isset($row['uid'])) {
                    $uid = $row['uid'];
                    $path = $input->getArgument('path');
                    if ($path) {
                        // Wait for the final file to appear (max 10 seconds)
                        $exists = false;
                        $existsAttempts = 0;
                        while (!$exists && $existsAttempts < 10) {
                            clearstatcache(true, $path);
                            if (file_exists($path)) {
                                $exists = true;
                            } else {
                                sleep(1);
                                $existsAttempts++;
                            }
                        }
                        // If the file exists, wait for its size to become stable
                        if ($exists) {
                            // Wait for files size dont change (max 30 secondes)
                            $stable = false;
                            $attempts = 0;
                            $lastSize = -1;
                            while (!$stable && $attempts < 30) {
                                clearstatcache(true, $path);
                                $currentSize = filesize($path);
                                // We wait for the size to be > 0 and it no longer changes
                                if ($currentSize > 0 && $currentSize === $lastSize) {
                                    $stable = true;
                                } else {
                                    $lastSize = $currentSize;
                                    sleep(1);
                                    $attempts++;
                                }
                            }
                            // Scan when file is stable (move complete) or time out (30s)
                            try {
                                $root = \OC::$server->get(IRootFolder::class);
                                $userFolder = $root->getUserFolder($uid);
                                // Get relative path from the absolute path
                                $relativePath = $userFolder->getRelativePath($path);
                                if ($relativePath) {
                                    $storage = $userFolder->getStorage();
                                    $scanner = $storage->getScanner();
                                    $scanner->scan($relativePath, true);
                                }
                            } catch (\Exception $e) {
                                // Ignore silently ( don't block the Aria2 hook)
                            }
                        }
                    }
                }
            }
            // =========================================================

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
