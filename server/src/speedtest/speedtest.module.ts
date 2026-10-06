import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SnapshotModule } from '../snapshot/snapshot.module';
import { SpeedtestScheduler } from './scheduler/speedtest.scheduler';
import { SpeedtestService } from './service/speedtest.service';
import config from './speedtest.config';

@Module({
  imports: [ConfigModule.forFeature(config), SnapshotModule],
  providers: [SpeedtestScheduler, SpeedtestService],
})
export class SpeedtestModule {}
