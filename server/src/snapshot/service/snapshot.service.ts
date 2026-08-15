import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Snapshot } from '../entity/snapshot.entity';
import type { AverageSnapshot } from '../type/average-snapshot.type';
import type { SnapshotData } from '../type/snapshot-data.type';

@Injectable()
export class SnapshotService {
  constructor(
    @InjectRepository(Snapshot)
    private readonly repository: Repository<Snapshot>,
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

  public create(data: SnapshotData): Promise<Snapshot> {
    const snapshot = this.repository.create(data);

    return this.repository.save(snapshot);
  }
}
