import { Inject, Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';

import { CronJob } from 'cron';

import { SnapshotService } from '../../snapshot/service/snapshot.service';
import { SpeedtestService } from '../service/speedtest.service';
import configuration from '../speedtest.config';

@Injectable()
export class SpeedtestScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(SpeedtestScheduler.name);

  constructor(
    private readonly snapshotService: SnapshotService,
    private readonly speedtestService: SpeedtestService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  public onApplicationBootstrap(): void {
    this.schedulerRegistry.addCronJob(
      'speedtest',
      CronJob.from({
        cronTime: this.config.cron,
        onTick: () => void this.run(),
        start: true,
      }),
    );
  }

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
