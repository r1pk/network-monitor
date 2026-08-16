import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SnapshotModule } from '../snapshot/snapshot.module';
import { SpeedtestScheduler } from './scheduler/speedtest.scheduler';
import { SpeedtestService } from './service/speedtest.service';
import configuration from './speedtest.config';

@Module({
  imports: [ConfigModule.forFeature(configuration), SnapshotModule],
  providers: [SpeedtestScheduler, SpeedtestService],
})
export class SpeedtestModule {}
