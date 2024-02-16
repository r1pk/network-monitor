import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { InternetSpeedSnapshotModule } from './internet-speed-snapshot/internet-speed-snapshot.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        extra: {
          decimalNumbers: true,
        },

        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),

        autoLoadEntities: true,
        synchronize: config.get('DATABASE_SYNC_ENABLED') === 'true',
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    InternetSpeedSnapshotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
