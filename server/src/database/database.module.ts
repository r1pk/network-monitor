import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => ({
        type: 'mysql',

        extra: {
          decimalNumbers: true,
        },

        host: config.host,
        port: config.port,
        database: config.name,
        username: config.username,
        password: config.password,

        autoLoadEntities: true,
        synchronize: config.synchronize,
      }),
    }),
  ],
})
export class DatabaseModule {}
