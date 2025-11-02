import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('SERVER_PORT', 8080);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port);
}

bootstrap().catch((error: Error) => {
  console.error('Failed to start server:', error.message);
});
