import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('App listening: ', port);
}
bootstrap();
