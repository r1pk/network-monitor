import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpeedTestModule } from './speedtest/speedtest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        extra: {
          decimalNumbers: true,
        },

        host: config.get('DATABASE_HOST') as string,
        port: config.get('DATABASE_PORT') as number,
        database: config.get('DATABASE_NAME') as string,
        username: config.get('DATABASE_USER') as string,
        password: config.get('DATABASE_PASSWORD') as string,

        autoLoadEntities: true,
        synchronize: config.get('DATABASE_SYNC_ENABLED') === 'true',
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    SpeedTestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
