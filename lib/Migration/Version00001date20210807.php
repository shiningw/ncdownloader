<?php

declare (strict_types = 1);

namespace OCA\NCDownloader\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version00001date20210807 extends SimpleMigrationStep
{

    /**
     * @param IOutput $output
     * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
     * @param array $options
     */
    public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options)
    {
    }

    /**
     * @param IOutput $output
     * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
     * @param array $options
     * @return null|ISchemaWrapper
     */
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options)
    {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if (!$schema->hasTable('ncdownloader_info')) {
            $table = $schema->createTable('ncdownloader_info');
            $table->addColumn('id', 'integer', [
                'autoincrement' => true,
                'notnull' => true,
                'length' => 10,
            ]);
            $table->addColumn('uid', 'string', [
                'notnull' => false,
                'length' => 64,
            ]);
            $table->addColumn('gid', 'string', [
                'notnull' => true,
                'length' => 32,
            ]);
            $table->addColumn('filename', 'string', [
                'notnull' => true,
                'length' => 255,
            ]);
            $table->addColumn('type', 'smallint', [
                'notnull' => true,
                'length' => 4,
                'default' => 1,
                'comment' => "Download Type(Aria2 = 1,Youtube = 2,Others = 3)",
            ]);
            $table->addColumn('status', 'smallint', [
                'notnull' => true,
                'length' => 1,
                'default' => 1,
            ]);
            $table->addColumn('followedby', 'string', [
                'notnull' => true,
                'length' => 16,
                'default' => 0,
            ]);
            $table->addColumn('timestamp', 'bigint', [
                'notnull' => true,
                'length' => 15,
                'default' => 0,
            ]);
            $table->addColumn('data', 'blob', [
                'notnull' => false,
                'default' => null,
            ]);
            $table->setPrimaryKey(['id','gid']);
        }
        return $schema;
    }

    /**
     * @param IOutput $output
     * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
     * @param array $options
     */
    public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options)
    {
    }
}
