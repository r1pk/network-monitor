import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnapshotController } from '../controller/snapshot.controller';
import { Snapshot } from '../entity/snapshot.entity';
import { SnapshotService } from '../service/snapshot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  controllers: [SnapshotController],
  providers: [SnapshotService],
})
export class SnapshotModule {}
