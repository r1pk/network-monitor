import { join } from 'node:path';

import type { DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  type: 'better-sqlite3',

  database: process.env.DATABASE_PATH || './storage/sqlite.db',

  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '!(*.d).{ts,js}')],

  migrationsRun: true,
  synchronize: ['true', '1'].includes(process.env.DATABASE_SYNCHRONIZE?.toLowerCase() || 'false'),
};
