import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SnapshotService } from '../snapshot/service/snapshot.service';
import { SpeedtestScheduler } from './scheduler/speedtest.scheduler';
import { SpeedtestService } from './service/speedtest.service';
import speedtestConfig from './speedtest.config';

@Module({
  imports: [ConfigModule.forFeature(speedtestConfig), SnapshotService],
  providers: [SpeedtestService, SpeedtestScheduler],
})
export class SpeedtestModule {}
