import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeedTestSnapshotController } from '../controller/speed-test-snapshot.controller';
import { SpeedTestService } from '../service/speed-test.service';
import { SpeedTestSnapshot } from '../entity/speed-test-snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeedTestSnapshot])],
  controllers: [SpeedTestSnapshotController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
