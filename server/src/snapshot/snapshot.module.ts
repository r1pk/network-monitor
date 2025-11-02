import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Snapshot } from './entity/snapshot.entity';
import { SnapshotController } from './snapshot.controller';
import { SnapshotService } from './snapshot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  controllers: [SnapshotController],
  providers: [SnapshotService],
})
export class SnapshotModule {}
