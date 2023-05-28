import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Task } from '../entities/task.entity';

const ormConfig: Options = {
  type: 'postgresql',
  entities: [Task],
  dbName: 'az-test-sql-db',
  highlighter: new SqlHighlighter(),
  debug: true,
  clientUrl:
    process.env.DB_URL ||
    'postgres://azure_test:L%3FJ4%5D%23sSFn9O@az-test-sql.postgres.database.azure.com:5432/az-test-sql-db',
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
};

export default ormConfig;
