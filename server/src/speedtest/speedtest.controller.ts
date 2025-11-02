import { Controller, Get, Query } from '@nestjs/common';

import { Snapshot } from './entity/snapshot.entity';
import { SpeedTestService } from './speedtest.service';
import { AverageSnapshot } from './type/average-snapshot.type';

@Controller('speedtest')
export class SpeedTestController {
  constructor(private readonly service: SpeedTestService) {}

  @Get()
  public getSnapshots(@Query('since') since?: string): Promise<Snapshot[]> {
    return this.service.getSnapshots(since);
  }

  @Get('average')
  public getAverageSnapshot(@Query('since') since?: string): Promise<AverageSnapshot> {
    return this.service.getAverageSnapshot(since);
  }
}
