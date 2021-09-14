<?php

declare (strict_types = 1);
/**
 * @copyright Copyright (c) 2020 Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
namespace OCA\NCDownloader\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version00002date20210912 extends SimpleMigrationStep
{

    /** @var IDBConnection */
    protected $connection;

    public function __construct(IDBConnection $connection)
    {
        $this->connection = $connection;
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

        $table = $schema->getTable('ncdownloader_info');
        if (!$table->hasColumn('speed')) {
            $table->addColumn('speed', 'string', [
                'notnull' => true,
                'length' => 255,
                'default' => 'unknown',
            ]);
        }
        if (!$table->hasColumn('progress')) {
            $table->addColumn('progress', 'string', [
                'notnull' => true,
                'length' => 255,
                'default' => '0',
            ]);
        }
        if (!$table->hasColumn('filesize')) {
            $table->addColumn('filesize', 'string', [
                'notnull' => false,
                'length' => 255,
                'default' => '',
            ]);
        }
        $table->addUniqueIndex(['gid'], 'gid_index');
        return $schema;
    }

}
