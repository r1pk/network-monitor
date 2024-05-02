import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { SpeedTestService } from '../service/speed-test.service';
import { SpeedTestSnapshot } from '../entity/speed-test-snapshot.entity';

@Controller('speed-test-snapshot')
export class SpeedTestSnapshotController {
  constructor(private readonly service: SpeedTestService) {}

  @Get()
  getSnapshots(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number): Promise<SpeedTestSnapshot[]> {
    return this.service.getSpeedTestSnapshots(limit);
  }

  @Get('latest')
  getLatestSnapshot(): Promise<SpeedTestSnapshot | undefined> {
    return this.service.getSpeedTestSnapshots(1).then((snapshots: SpeedTestSnapshot[]) => {
      return snapshots.at(0);
    });
  }

  @Get('average')
  getAverageSnapshot(@Query('since') since?: string): Promise<object | undefined> {
    return this.service.getAverageSpeedTestSnapshot(since);
  }
}
