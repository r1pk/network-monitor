import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternetSpeedSnapshotService } from './services/internet-speed-snapshot.service';
import { InternetSpeedSnapshotController } from './controllers/internet-speed-snapshot.controller';
import { InternetSpeedSnapshot } from './entities/internet-speed-snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternetSpeedSnapshot])],
  controllers: [InternetSpeedSnapshotController],
  providers: [InternetSpeedSnapshotService],
})
export class InternetSpeedSnapshotModule {}
