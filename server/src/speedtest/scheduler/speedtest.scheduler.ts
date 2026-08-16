import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { SnapshotService } from '../../snapshot/service/snapshot.service';
import { SpeedtestService } from '../service/speedtest.service';

@Injectable()
export class SpeedtestScheduler {
  private readonly logger = new Logger(SpeedtestScheduler.name);

  constructor(
    private readonly snapshotService: SnapshotService,
    private readonly speedtestService: SpeedtestService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async run(): Promise<void> {
    try {
      const result = await this.speedtestService.run();

      if (result === null) {
        await this.snapshotService.create({
          download: null,
          upload: null,
          ping: null,
          loss: null,
          host: null,
          url: null,
        });

        return;
      }

      await this.snapshotService.create({
        download: result.download.bandwidth,
        upload: result.upload.bandwidth,
        ping: result.ping.latency,
        loss: result.packetLoss,
        host: result.server.host,
        url: result.result.url,
      });
    } catch (error) {
      this.logger.error('Failed to execute scheduled speedtest', error);
    }
  }
}
