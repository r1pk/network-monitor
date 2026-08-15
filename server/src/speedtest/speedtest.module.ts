import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SnapshotModule } from '../snapshot/snapshot.module';
import { SpeedtestScheduler } from './scheduler/speedtest.scheduler';
import { SpeedtestService } from './service/speedtest.service';

@Module({
  imports: [ConfigModule, SnapshotModule],
  providers: [SpeedtestService, SpeedtestScheduler],
})
export class SpeedtestModule {}
