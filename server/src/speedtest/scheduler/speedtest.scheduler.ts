import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { SnapshotService } from '../../snapshot/service/snapshot.service';
import type { SnapshotData } from '../../snapshot/type/snapshot-data.type';
import { SpeedtestService } from '../service/speedtest.service';

@Injectable()
export class SpeedtestScheduler {
  private readonly logger = new Logger(SpeedtestScheduler.name);

  constructor(
    private readonly speedtestService: SpeedtestService,
    private readonly snapshotService: SnapshotService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async run(): Promise<void> {
    try {
      const result = await this.speedtestService.run();
      const data: SnapshotData = {
        download: null,
        upload: null,
        ping: null,
        loss: null,
        host: null,
        url: null,
      };

      if (result) {
        data.download = result.download.bandwidth;
        data.upload = result.upload.bandwidth;
        data.ping = result.ping.latency;
        data.loss = result.packetLoss;
        data.host = result.server.host;
        data.url = result.result.url;
      }

      await this.snapshotService.create(data);
    } catch (error) {
      this.logger.error('Failed to execute scheduled speedtest', error);
    }
  }
}
