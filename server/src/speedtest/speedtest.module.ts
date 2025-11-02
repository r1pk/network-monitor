import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Snapshot } from './entity/snapshot.entity';
import { SpeedTestController } from './speedtest.controller';
import { SpeedTestService } from './speedtest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  controllers: [SpeedTestController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
