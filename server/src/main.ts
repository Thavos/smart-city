import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());

  app.enableCors();

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log('App listening: ', port);
}
bootstrap();
