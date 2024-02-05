import { Controller, Get } from '@nestjs/common';
import { InternetSpeedSnapshotService } from './internet-speed-snapshot.service';
import { InternetSpeedSnapshot } from './internet-speed-snapshot.entity';

@Controller('internet-speed-snapshot')
export class InternetSpeedSnapshotController {
  constructor(private readonly service: InternetSpeedSnapshotService) {}

  @Get()
  getSnapshots(): Promise<InternetSpeedSnapshot[]> {
    return this.service.getInternetSpeedSnapshots();
  }
}
