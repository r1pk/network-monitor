import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql' as const,

  extra: {
    decimalNumbers: true,
  },

  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT || 3306),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,

  autoLoadEntities: true,
  synchronize: ['true', '1'].includes(process.env.DATABASE_SYNCHRONIZE?.toLowerCase() || 'false'),
}));
