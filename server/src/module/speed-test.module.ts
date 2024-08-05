import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeedTestController } from '../controller/speed-test.controller';
import { SpeedTestService } from '../service/speed-test.service';
import { Snapshot } from '../entity/snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  controllers: [SpeedTestController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
