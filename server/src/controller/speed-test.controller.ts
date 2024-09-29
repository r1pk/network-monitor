import { Controller, Get, Query } from '@nestjs/common';

import { Snapshot } from '../entity/snapshot.entity';
import { SpeedTestService } from '../service/speed-test.service';

@Controller('speed-test')
export class SpeedTestController {
  constructor(private readonly service: SpeedTestService) {}

  @Get()
  public getSnapshots(@Query('since') since?: string): Promise<Snapshot[]> {
    return this.service.getSnapshots(since);
  }

  @Get('average')
  public getAverageSnapshot(@Query('since') since?: string): Promise<object> {
    return this.service.getAverageSnapshot(since);
  }
}
