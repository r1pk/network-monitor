import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { InternetSpeedSnapshot } from './internet-speed-snapshot.entity';

@Injectable()
export class InternetSpeedSnapshotService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(InternetSpeedSnapshot) private readonly repository: Repository<InternetSpeedSnapshot>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  performCyclicInternetSpeedMeasurement(): Promise<void> {
    return this.measureInternetSpeed().then((snapshot) => {
      this.repository.save(snapshot);
    });
  }

  getInternetSpeedSnapshots(limit?: number): Promise<InternetSpeedSnapshot[]> {
    return this.repository.find({ take: limit, order: { timestamp: 'DESC' } });
  }

  getInternetSpeedSummary(since?: string): Promise<object | undefined> {
    const builder = this.repository.createQueryBuilder('internet_speed_snapshot');

    builder.select([
      'avg(internet_speed_snapshot.download) as download',
      'avg(internet_speed_snapshot.upload) as upload',
      'avg(internet_speed_snapshot.ping) as ping',
      'avg(internet_speed_snapshot.loss) as loss',
    ]);

    if (since !== undefined) {
      builder.where('internet_speed_snapshot.timestamp >= :since', {
        since: since,
      });
    }

    return builder.getRawOne();
  }

  measureInternetSpeed(): Promise<InternetSpeedSnapshot> {
    return new Promise((resolve) => {
      const snapshot = new InternetSpeedSnapshot();
      const args = this.config.get<string>('SPEEDTEST_CLI_ARGS');

      exec(`speedtest ${args} --format=json`, (error, stdout) => {
        if (error) {
          return resolve(snapshot);
        }

        const output = JSON.parse(stdout);

        snapshot.download = output.download.bandwidth;
        snapshot.upload = output.upload.bandwidth;
        snapshot.ping = output.ping.latency;
        snapshot.loss = output.packetLoss;
        snapshot.host = output.server.host;
        snapshot.url = output.result.url;

        return resolve(snapshot);
      });
    });
  }
}
