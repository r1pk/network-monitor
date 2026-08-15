import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from './database/database.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { SpeedtestModule } from './speedtest/speedtest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
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
