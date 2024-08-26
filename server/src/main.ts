import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('APP_PORT', 8080);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port);
}
bootstrap();
