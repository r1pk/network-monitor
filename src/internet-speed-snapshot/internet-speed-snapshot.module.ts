import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternetSpeedSnapshotService } from './internet-speed-snapshot.service';
import { InternetSpeedSnapshotController } from './internet-speed-snapshot.controller';
import { InternetSpeedSnapshot } from './internet-speed-snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternetSpeedSnapshot])],
  controllers: [InternetSpeedSnapshotController],
  providers: [InternetSpeedSnapshotService],
})
export class InternetSpeedSnapshotModule {}
