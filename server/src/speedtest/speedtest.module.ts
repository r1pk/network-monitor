import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SnapshotService } from '../snapshot/service/snapshot.service';
import { SpeedtestService } from './service/speedtest.service';
import speedtestConfig from './speedtest.config';

@Module({
  imports: [ConfigModule.forFeature(speedtestConfig), SnapshotService],
  providers: [SpeedtestService],
})
export class SpeedtestModule {}
