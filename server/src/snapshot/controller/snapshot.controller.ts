import { Controller, Get, Query } from '@nestjs/common';

import { SnapshotQueryDto } from '../dto/snapshot-query.dto';
import type { Snapshot } from '../entity/snapshot.entity';
import { SnapshotService } from '../service/snapshot.service';
import type { AverageSnapshot } from '../type/average-snapshot.type';

@Controller('snapshot')
export class SnapshotController {
  constructor(private readonly service: SnapshotService) {}

  @Get()
  public getSnapshots(@Query() query: SnapshotQueryDto): Promise<Snapshot[]> {
    return this.service.getSnapshots(query.since);
  }

  @Get('average')
  public getAverageSnapshot(@Query() query: SnapshotQueryDto): Promise<AverageSnapshot> {
    return this.service.getAverageSnapshot(query.since);
  }
}
