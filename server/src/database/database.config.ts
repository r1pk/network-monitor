import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'better-sqlite3' as const,

  database: process.env.DATABASE_PATH,

  autoLoadEntities: true,
  synchronize: ['true', '1'].includes(process.env.DATABASE_SYNCHRONIZE?.toLowerCase() || 'false'),
}));
