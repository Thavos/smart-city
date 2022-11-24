import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  if (process.env.GLOBALPREFIX) app.setGlobalPrefix(process.env.GLOBALPREFIX);

  app.use(cookieParser());

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('App listening: ', port);
}
bootstrap();
