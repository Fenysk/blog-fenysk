import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader('Access-Control-Allow-Origin', 'https://fenysk.fr');
    next();
  })

  // app.enableCors({
  //   origin: 'https://fenysk.fr',
  //   allowedHeaders: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  // });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'))

  await app.listen(3621);
}

bootstrap();
