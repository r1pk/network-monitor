import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(config.asProvider())],
})
export class DatabaseModule {}
