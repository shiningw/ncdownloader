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
        $this->conn = \OC::$server->getDatabaseConnection();
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
            ->execute();
        return $queryBuilder->fetchAll();
    }

    public function getByUid($uid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('uid = :uid')
            ->setParameter('uid', $uid)
            ->execute();
        return $queryBuilder->fetchAll();
    }

    public function getUidByGid($gid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('uid')
            ->from($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid)
            ->execute();
        return $queryBuilder->fetchColumn();
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
            ->execute();
        return $qb->fetchAll();
    }

    public function getByGid($gid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid)
            ->execute();
        return $queryBuilder->fetch();
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
        return $qb->execute();
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
        return $query->execute();
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
        return $query->execute();
    }

    public function getDBType(): string
    {
        return \OC::$server->getConfig()->getSystemValue('dbtype', "mysql");
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
