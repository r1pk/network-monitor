import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { InternetSpeedSnapshotService } from './internet-speed-snapshot.service';
import { InternetSpeedSnapshot } from './internet-speed-snapshot.entity';

@Controller('internet-speed-snapshot')
export class InternetSpeedSnapshotController {
  constructor(private readonly service: InternetSpeedSnapshotService) {}

  @Get()
  getSnapshots(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number): Promise<InternetSpeedSnapshot[]> {
    return this.service.getInternetSpeedSnapshots(limit);
  }

  @Get('last')
  getLastSnapshot(): Promise<InternetSpeedSnapshot | undefined> {
    return this.service.getInternetSpeedSnapshots(1).then((snapshots) => {
      return snapshots.at(0);
    });
  }

  @Get('summary')
  getSummary(@Query('since') since?: string): Promise<object | undefined> {
    return this.service.getInternetSpeedSummary(since);
  }
}
