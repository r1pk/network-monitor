import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const service = app.get(ConfigService);

  const environment = service.get<string>('NODE_ENV', 'development');
  const port = service.get<number>('SERVER_PORT', 8080);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  if (environment !== 'production') {
    app.enableCors();
  }

  await app.listen(port);
}

bootstrap().catch((error: Error) => {
  console.error('Failed to start server:', error.message);
});
