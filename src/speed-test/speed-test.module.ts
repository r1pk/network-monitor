import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeedTestService } from './service/speed-test.service';
import { SpeedTestController } from './controller/speed-test.controller';
import { SpeedTestResult } from './entity/speed-test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeedTestResult])],
  controllers: [SpeedTestController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
