<?php
namespace OCA\NCDownloader\Db;
use OCA\NCDownloader\Tools\Helper as ToolsHelper;

class Helper
{
    //@var OC\DB\ConnectionAdapter
    private $conn;
    private $table = "ncdownloader_info";
    private $prefixedTable;
    public $queryBuilder;

    public function __construct()
    {
        $this->conn = \OC::$server->get(\OCP\IDBConnection::class);
        $this->queryBuilder = $this->conn->getQueryBuilder();
        $this->prefixedTable = $this->queryBuilder->getTableName($this->table);
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
        $result = $this->queryBuilder
            ->select('filename', 'type', 'gid', 'timestamp', 'status')
            ->from($this->table)
            ->executeQuery();
        $rows = $result->fetchAll();
        $result->closeCursor();
        return $rows;
    }

    public function getByUid($uid)
    {
        $result = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('uid = :uid')
            ->setParameter('uid', $uid)
            ->executeQuery();
        $rows = $result->fetchAll();
        $result->closeCursor();
        return $rows;
    }

    public function getUidByGid($gid)
    {
        $result = $this->queryBuilder
            ->select('uid')
            ->from($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid)
            ->executeQuery();
        $value = $result->fetchOne();
        $result->closeCursor();
        return $value;
    }

    public function getYtdlByUid($uid)
    {
        $result = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('uid = :uid')
            ->andWhere('type = :type')
            ->setParameter('uid', $uid)
            ->setParameter('type', ToolsHelper::DOWNLOADTYPE['YOUTUBE-DL'])
            ->orderBy('id', 'DESC')
            ->executeQuery();
        $rows = $result->fetchAll();
        $result->closeCursor();
        return $rows;
    }

    public function getByGid($gid)
    {
        $result = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid)
            ->executeQuery();
        $row = $result->fetch();
        $result->closeCursor();
        return $row;
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
        return \OC::$server->get(\OCP\IConfig::class)->getSystemValue('dbtype', "mysql");
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
