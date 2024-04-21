import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { SpeedTestService } from '../service/speed-test.service';
import { SpeedTestResult } from '../entity/speed-test-result.entity';

@Controller('speed-test-result')
export class SpeedTestResultController {
  constructor(private readonly service: SpeedTestService) {}

  @Get()
  getResults(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number): Promise<SpeedTestResult[]> {
    return this.service.getSpeedTestResults(limit);
  }

  @Get('latest')
  getLatestResult(): Promise<SpeedTestResult | undefined> {
    return this.service.getSpeedTestResults(1).then((snapshots: SpeedTestResult[]) => {
      return snapshots.at(0);
    });
  }

  @Get('average')
  getAverageResult(@Query('since') since?: string): Promise<object | undefined> {
    return this.service.getAverageSpeedTestResult(since);
  }
}
