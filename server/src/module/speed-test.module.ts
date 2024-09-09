import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpeedTestController } from '../controller/speed-test.controller';
import { Snapshot } from '../entity/snapshot.entity';
import { SpeedTestService } from '../service/speed-test.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  controllers: [SpeedTestController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
