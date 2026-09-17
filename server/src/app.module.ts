import { join } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './database/database.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { SpeedtestModule } from './speedtest/speedtest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/{*path}'],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    SnapshotModule,
    SpeedtestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
