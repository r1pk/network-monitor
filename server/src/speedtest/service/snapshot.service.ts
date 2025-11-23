import { type ExecException, execFile } from 'node:child_process';

import { Injectable, Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import type { Repository } from 'typeorm';

import { Snapshot } from '../entity/snapshot.entity';
import type { AverageSnapshot } from '../type/average-snapshot.type';
import type { SpeedTestResult } from '../type/speed-test-result.type';

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

    if (since) {
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

    if (since) {
      builder.where('snapshot.timestamp >= :since', {
        since: since,
      });
    }

    return builder.getRawOne() as Promise<AverageSnapshot>;
  }

  public performSpeedTest(): Promise<Snapshot> {
    return new Promise((resolve) => {
      const snapshot = new Snapshot();
      const args = this.getSpeedtestArguments();

      execFile('speedtest', args, (error: ExecException | null, stdout: string) => {
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

  private getSpeedtestArguments(): string[] {
    const customSpeedtestArgs = this.config.get<string>('SPEEDTEST_CLI_ARGS');
    const defaultpeedtestArgs: string[] = ['--format=json'];

    if (!customSpeedtestArgs) {
      return defaultpeedtestArgs;
    }

    return customSpeedtestArgs.split(/\s+/).concat(defaultpeedtestArgs);
  }

  // biome-ignore-start lint/correctness/noUnusedPrivateClassMembers: invoked by decorator
  @Cron(CronExpression.EVERY_5_MINUTES)
  private async runScheduledSpeedTest(): Promise<void> {
    try {
      const snapshot = await this.performSpeedTest();

      await this.repository.save(snapshot);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to perform cyclic speedtest: ${error.message}`);
      }
    }
  }
  // biome-ignore-end lint/correctness/noUnusedPrivateClassMembers: invoked by decorator
}
