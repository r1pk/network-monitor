import { Controller, Get, Query } from '@nestjs/common';

import { Snapshot } from '../entity/snapshot.entity';
import { SnapshotService } from '../service/snapshot.service';

@Controller('snapshot')
export class SnapshotController {
  constructor(private readonly service: SnapshotService) {}

  @Get()
  public getSnapshots(@Query('since') since?: string): Promise<Snapshot[]> {
    return this.service.getSnapshots(since);
  }

  @Get('average')
  public getAverageSnapshot(@Query('since') since?: string): Promise<object> {
    return this.service.getAverageSnapshot(since);
  }
}
