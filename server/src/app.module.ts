import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from './database/database.module';
import { SpeedTestModule } from './speedtest/speedtest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    SpeedTestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
