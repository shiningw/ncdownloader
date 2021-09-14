<?php
namespace OCA\NCDownloader\Tools;

class DBConn
{
    //@var OC\DB\ConnectionAdapter
    private $conn;
    private $table = "ncdownloader_info";

    public function __construct()
    {
        $this->conn = \OC::$server->getDatabaseConnection();
        $this->queryBuilder = $this->conn->getQueryBuilder();
        //$container = \OC::$server->query(\OCP\IServerContainer::class);
        //Helper::debug(get_class($container->query(\OCP\RichObjectStrings\IValidator::class)));
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

    public function getYoutubeByUid($uid)
    {
        $queryBuilder = $this->queryBuilder
            ->select('*')
            ->from($this->table)
            ->where('uid = :uid')
            ->where('type = :type')
            ->setParameter('uid', $uid)
            ->setParameter('type', 2)
            ->execute();
        return $queryBuilder->fetchAll();
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

    public function save(array $keys, $values = array(),$conditions = array())
    {
        return $this->conn->setValues($this->table, $keys, $values,$conditions);
    }

    public function deleteByGid($gid)
    {
        // $sql = sprintf("DELETE FROM %s WHERE gid = ?",'*PREFIX*'.$this->table);
        // return $this->conn->executeStatement($sql,array($gid));
        $qb = $this->queryBuilder
            ->delete($this->table)
            ->where('gid = :gid')
            ->setParameter('gid', $gid);
        return $qb->execute();
    }
    public function execute($sql, $values)
    {
        return $this->conn->executeUpdate($sql, $values);

        // for some reason this doesn't work
        $query = $this->queryBuilder;
        $query->update('ncdownloader_info')
            ->set("data", $query->createNamedParameter($value))
            ->where($query->expr()->eq('gid', $query->createNamedParameter($gid)));
        // ->setParameter('gid', $gid);
        // return $query->execute();
        //return $query->getSQL();
        return $this->queryBuilder->getSQL();
    }

}
