import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { SpeedTestService } from '../service/speed-test.service';
import { SpeedTestResult } from '../entity/speed-test-result.entity';

@Controller('speed-test')
export class SpeedTestController {
  constructor(private readonly service: SpeedTestService) {}

  @Get('results')
  getResults(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number): Promise<SpeedTestResult[]> {
    return this.service.getSpeedTestResults(limit);
  }

  @Get('latest-result')
  getLatestResult(): Promise<SpeedTestResult | undefined> {
    return this.service.getSpeedTestResults(1).then((snapshots) => {
      return snapshots.at(0);
    });
  }

  @Get('average-result')
  getAverageResult(@Query('since') since?: string): Promise<object | undefined> {
    return this.service.getAverageSpeedTestResult(since);
  }
}
