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
    const snapshot = new InternetSpeedSnapshot();

    try {
      const measurementResult = await measureInternetSpeed();

      snapshot.download = measurementResult.download;
      snapshot.upload = measurementResult.upload;
      snapshot.latency = measurementResult.latency;
      snapshot.jitter = measurementResult.jitter;
      snapshot.loss = measurementResult.loss;
      snapshot.host = measurementResult.host;
      snapshot.url = measurementResult.url;
    } catch (error) {
      this.logger.error(`Internet speed measurement failed`, error.stack);
    } finally {
      this.repository.save(snapshot);
    }
  }

  async getInternetSpeedSnapshots(): Promise<InternetSpeedSnapshot[]> {
    return this.repository.find({ order: { timestamp: 'DESC' } });
  }
}
