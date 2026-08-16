import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        extra: {
          decimalNumbers: true,
        },

        host: config.get('DATABASE_HOST'),
        port: +config.get('DATABASE_PORT'),
        database: config.get('DATABASE_NAME'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),

        autoLoadEntities: true,
        synchronize: config.get('DATABASE_SYNCHRONIZE') === 'true',
      }),
    }),
  ],
})
export class DatabaseModule {}
