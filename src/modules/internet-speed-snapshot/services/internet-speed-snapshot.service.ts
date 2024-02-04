import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InternetSpeedSnapshot } from '../entities/internet-speed-snapshot.entity';
import { measureInternetSpeed } from '../../../utils/measure-internet-speed';

@Injectable()
export class InternetSpeedSnapshotService {
  private readonly logger = new Logger(InternetSpeedSnapshotService.name);

  constructor(
    @InjectRepository(InternetSpeedSnapshot) private readonly repository: Repository<InternetSpeedSnapshot>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async performCyclicInternetSpeedMeasurement(): Promise<void> {
    const internetSpeedSnapshot = new InternetSpeedSnapshot();

    try {
      const currentInternetSpeed = await measureInternetSpeed();

      internetSpeedSnapshot.download = currentInternetSpeed.download;
      internetSpeedSnapshot.upload = currentInternetSpeed.upload;
      internetSpeedSnapshot.latency = currentInternetSpeed.latency;
      internetSpeedSnapshot.jitter = currentInternetSpeed.jitter;
      internetSpeedSnapshot.loss = currentInternetSpeed.loss;
      internetSpeedSnapshot.host = currentInternetSpeed.host;
      internetSpeedSnapshot.url = currentInternetSpeed.url;
    } catch (error) {
      this.logger.error(`Internet speed measurement failed`, error.stack);
    } finally {
      this.repository.save(internetSpeedSnapshot);
    }
  }

  async getInternetSpeedSnapshots(): Promise<InternetSpeedSnapshot[]> {
    return this.repository.find({ order: { timestamp: 'DESC' } });
  }
}
