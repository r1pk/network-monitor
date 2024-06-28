import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { SpeedTestModule } from './speed-test.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        extra: {
          decimalNumbers: true,
        },

        host: config.get('MYSQL_HOST'),
        port: config.get('MYSQL_PORT'),

        database: config.get('MYSQL_DATABASE'),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASSWORD'),

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
