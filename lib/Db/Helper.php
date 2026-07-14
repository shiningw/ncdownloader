<?php
namespace OCA\Vapor\Db;
use OCA\Vapor\Tools\Helper as ToolsHelper;

class Helper
{
    //@var OC\DB\ConnectionAdapter
    private $conn;
    private $table = "vapor_info";
    private $prefixedTable;
    public $queryBuilder;

    public function __construct()
    {
        // $this->conn = \OC::$server->getDatabaseConnection();
	// BEGIN STEVE EDITS
        $this->conn = \OC::$server->get(\OCP\IDBConnection::class);
        // END STEVE EDITS    
	$this->queryBuilder = $this->conn->getQueryBuilder();
        $this->prefixedTable = $this->queryBuilder->getTableName($this->table);
        //$container = \OC::$server->query(\OCP\IServerContainer::class);
        //ToolsHelper::debug(get_class($container->query(\OCP\RichObjectStrings\IValidator::class)));
        //$this->conn = \OC::$server->query(Connection::class);//working only with 22
        //$this->connAdapter = \OC::$server->getDatabaseConnection();
        //$this->conn = $this->connAdapter->getInner();
    }

    public function insert($insert)
    {
        $inserted = (bool) $this->conn->insertIfNotExist('*PREFIX*' . $this->table, $insert, [
            'gid',
        ]);
        return $inserted;
    }
    public function getAll()
    {
        //OC\DB\QueryBuilder\QueryBuilder
        $queryBuilder = $this->queryBuilder
            ->select('filename', 'type', 'gid', 'timestamp', 'status')
            ->from($this->table)
            ->executeQuery();
        return $queryBuilder->fetchAll();
    }

    public function getByUid($uid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('uid = :uid')
            ->setParameter('uid', $uid)
            ->executeQuery();
        return $queryBuilder->fetchAll();
    }

    public function getUidByGid($gid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('uid')
            ->from($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid)
            ->executeQuery();
        return $queryBuilder->fetchOne();
    }

    public function getYtdlByUid($uid)
    {
        $qb = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('uid = :uid')
            ->andWhere('type = :type')
            ->setParameter('uid', $uid)
            ->setParameter('type', ToolsHelper::DOWNLOADTYPE['YOUTUBE-DL'])
            ->orderBy('id', 'DESC')
            ->executeQuery();
        return $qb->fetchAll();
    }

    public function getByGid($gid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid)
            ->executeQuery();
        return $queryBuilder->fetchAssociative();
    }

    public function save(array $keys, $values = array(), $conditions = array())
    {
        return $this->conn->setValues($this->table, $keys, $values, $conditions);
    }

    public function deleteByGid($gid)
    {
        $qb = $this->queryBuilder
            ->delete($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid);
        return $qb->executeStatement();
    }
    public function executeUpdate($sql, $values)
    {
        return $this->conn->executeUpdate($sql, $values);
    }

    public function updateStatus($gid, $status = 1)
    {
        $query = $this->queryBuilder;
        $query->update($this->table)
            ->set("status", $query->createNamedParameter($status))
            ->where('gid = :gid')
            ->setParameter('gid', $gid);
        return $query->executeStatement();
        //$sql = sprintf("UPDATE %s set status = ? WHERE gid = ?", $this->prefixedTable);
        //$this->execute($sql, [$status, $gid]);
    }

    public function updateFilename($gid, $filename)
    {
        $query = $this->queryBuilder;
        $query->update($this->table)
            ->set("filename", $query->createNamedParameter($filename))
            ->where('gid = :gid')
            ->andWhere('filename = :filename')
            ->setParameter('gid', $gid)
            ->setParameter('filename', 'unknown');
        return $query->executeStatement();
    }

    public function getDBType(): string
    {
	    // return \OC::$server->getConfig()->getSystemValue('dbtype', "mysql");
	    // BEGIN STEVE EDITS
            return \OC::$server->get(\OCP\IConfig::class)->getSystemValue('dbtype', "mysql");
            // END STEVE EDITS
    }

    public function getExtra($data)
    {
        if ($this->getDBType() == "pgsql" && is_resource($data)) {
            if (function_exists("pg_unescape_bytea")) {
                $extra = pg_unescape_bytea(stream_get_contents($data));
            }
            else {
                $extra = stream_get_contents($data);
            }
            return unserialize($extra);
        }
        return unserialize($data);
    }

}
