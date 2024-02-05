import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { InternetSpeedSnapshot } from './internet-speed-snapshot.entity';

@Injectable()
export class InternetSpeedSnapshotService {
  constructor(
    @InjectRepository(InternetSpeedSnapshot) private readonly repository: Repository<InternetSpeedSnapshot>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  performCyclicInternetSpeedMeasurement(): Promise<void> {
    return this.measureInternetSpeed().then((snapshot) => {
      this.repository.save(snapshot);
    });
  }

  measureInternetSpeed(): Promise<InternetSpeedSnapshot> {
    return new Promise((resolve) => {
      const snapshot = new InternetSpeedSnapshot();

      exec('speedtest --format=json', (error, stdout) => {
        if (error) {
          snapshot.log = error.message;

          return resolve(snapshot);
        }

        const output = JSON.parse(stdout);

        snapshot.download = output.download.bandwidth;
        snapshot.upload = output.upload.bandwidth;
        snapshot.ping = output.ping.latency;
        snapshot.loss = output.packetLoss;
        snapshot.host = output.server.host;
        snapshot.url = output.result.url;

        resolve(snapshot);
      });
    });
  }

  getInternetSpeedSnapshots(): Promise<InternetSpeedSnapshot[]> {
    return this.repository.find({ order: { timestamp: 'DESC' } });
  }
}
