import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeedTestResultController } from '../controller/speed-test-result.controller';
import { SpeedTestService } from '../service/speed-test.service';
import { SpeedTestResult } from '../entity/speed-test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeedTestResult])],
  controllers: [SpeedTestResultController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
