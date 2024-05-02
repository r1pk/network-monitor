import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { SpeedTestSnapshot } from '../entity/speed-test-snapshot.entity';

@Injectable()
export class SpeedTestService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(SpeedTestSnapshot) private readonly repository: Repository<SpeedTestSnapshot>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  performCyclicSpeedTest(): Promise<void> {
    return this.performSpeedTest().then((snapshot: SpeedTestSnapshot) => {
      this.repository.save(snapshot);
    });
  }

  getSpeedTestSnapshots(limit?: number): Promise<SpeedTestSnapshot[]> {
    return this.repository.find({ take: limit, order: { timestamp: 'DESC' } });
  }

  getAverageSpeedTestSnapshot(since?: string): Promise<object | undefined> {
    const builder = this.repository.createQueryBuilder('speed_test_snapshot');

    builder.select([
      'avg(speed_test_snapshot.download) as download',
      'avg(speed_test_snapshot.upload) as upload',
      'avg(speed_test_snapshot.ping) as ping',
      'avg(speed_test_snapshot.loss) as loss',
    ]);

    if (since !== undefined) {
      builder.where('speed_test_snapshot.timestamp >= :since', {
        since: since,
      });
    }

    return builder.getRawOne();
  }

  performSpeedTest(): Promise<SpeedTestSnapshot> {
    return new Promise((resolve) => {
      const snapshot = new SpeedTestSnapshot();
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
