import { Controller, Get, Query } from '@nestjs/common';
import { SpeedTestService } from '../service/speed-test.service';
import { Snapshot } from '../entity/snapshot.entity';

@Controller('speed-test')
export class SpeedTestController {
  constructor(private readonly service: SpeedTestService) {}

  @Get()
  getSnapshots(@Query('since') since?: string): Promise<Snapshot[]> {
    return this.service.getSnapshots(since);
  }

  @Get('average')
  getAverageSnapshot(@Query('since') since?: string): Promise<object> {
    return this.service.getAverageSnapshot(since);
  }
}
