import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { SpeedTestResult } from '../entity/speed-test-result.entity';

@Injectable()
export class SpeedTestService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(SpeedTestResult) private readonly repository: Repository<SpeedTestResult>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  performCyclicSpeedTest(): Promise<void> {
    return this.performSpeedTest().then((result: SpeedTestResult) => {
      this.repository.save(result);
    });
  }

  getSpeedTestResults(limit?: number): Promise<SpeedTestResult[]> {
    return this.repository.find({ take: limit, order: { timestamp: 'DESC' } });
  }

  getAverageSpeedTestResult(since?: string): Promise<object | undefined> {
    const builder = this.repository.createQueryBuilder('speed_test_result');

    builder.select([
      'avg(speed_test_result.download) as download',
      'avg(speed_test_result.upload) as upload',
      'avg(speed_test_result.ping) as ping',
      'avg(speed_test_result.loss) as loss',
    ]);

    if (since !== undefined) {
      builder.where('speed_test_result.timestamp >= :since', {
        since: since,
      });
    }

    return builder.getRawOne();
  }

  performSpeedTest(): Promise<SpeedTestResult> {
    return new Promise((resolve) => {
      const result = new SpeedTestResult();
      const args = this.config.get<string>('SPEEDTEST_CLI_ARGS');

      exec(`speedtest ${args} --format=json`, (error, stdout) => {
        if (error) {
          return resolve(result);
        }

        const output = JSON.parse(stdout);

        result.download = output.download.bandwidth;
        result.upload = output.upload.bandwidth;
        result.ping = output.ping.latency;
        result.loss = output.packetLoss;
        result.host = output.server.host;
        result.url = output.result.url;

        return resolve(result);
      });
    });
  }
}
