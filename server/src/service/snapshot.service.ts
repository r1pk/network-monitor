import { exec } from 'node:child_process';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Snapshot } from '../entity/snapshot.entity';
import { AverageSnapshot } from '../type/average-snapshot.type';
import { SpeedTestResult } from '../type/speed-test-result.type';

@Injectable()
export class SnapshotService {
  private readonly logger = new Logger(SnapshotService.name);

  constructor(
    @InjectRepository(Snapshot)
    private readonly repository: Repository<Snapshot>,
    private readonly config: ConfigService,
  ) {}

  public getSnapshots(since?: string): Promise<Snapshot[]> {
    const builder = this.repository.createQueryBuilder('snapshot');

    if (since !== undefined) {
      builder.where('snapshot.timestamp >= :since', {
        since: since,
      });
    }

    return builder.getMany();
  }

  public getAverageSnapshot(since?: string): Promise<AverageSnapshot> {
    const builder = this.repository.createQueryBuilder('snapshot');

    builder.select([
      'avg(snapshot.download) as download',
      'avg(snapshot.upload) as upload',
      'avg(snapshot.ping) as ping',
      'avg(snapshot.loss) as loss',
    ]);

    if (since !== undefined) {
      builder.where('snapshot.timestamp >= :since', {
        since: since,
      });
    }

    return builder.getRawOne() as Promise<AverageSnapshot>;
  }

  public performSpeedTest(): Promise<Snapshot> {
    return new Promise((resolve) => {
      const snapshot = new Snapshot();
      const args = this.config.get<string>('SPEEDTEST_CLI_ARGS');

      exec(`speedtest ${args} --format=json`, (error, stdout) => {
        if (error) {
          return resolve(snapshot);
        }

        const output = JSON.parse(stdout) as SpeedTestResult;

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

  @Cron(CronExpression.EVERY_5_MINUTES)
  private performCyclicSpeedTest(): Promise<void> {
    return this.performSpeedTest().then((snapshot: Snapshot) => {
      this.repository.save(snapshot).catch((error: Error) => {
        this.logger.error('Failed to save speedtest snapshot: ' + error.message);
      });
    });
  }
}
