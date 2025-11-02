import { Controller, Get, Query } from '@nestjs/common';

import { Snapshot } from './entity/snapshot.entity';
import { SnapshotService } from './snapshot.service';
import { AverageSnapshot } from './type/average-snapshot.type';

@Controller('snapshot')
export class SnapshotController {
  constructor(private readonly service: SnapshotService) {}

  @Get()
  public getSnapshots(@Query('since') since?: string): Promise<Snapshot[]> {
    return this.service.getSnapshots(since);
  }

  @Get('average')
  public getAverageSnapshot(@Query('since') since?: string): Promise<AverageSnapshot> {
    return this.service.getAverageSnapshot(since);
  }
}
