import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as express from 'express';

import { AppModule } from './app.module';
import { ParseTokenPipe } from './parseToken';
import { initializeSwagger } from './swagger/initializeSwagger';

const logger = new Logger('main.ts');

const port = process.env.PORT as string | number;
const serverUrl = process.env.SERVER_URL as string;

if (!port) {
  throw new Error('PORT is not defined');
}

if (!serverUrl) {
  throw new Error('SERVER_URL is not defined');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());
  const parseTokenPipe = app.get<ParseTokenPipe>(ParseTokenPipe);
  app.useGlobalGuards(parseTokenPipe);

  if (process.env.NODE_ENV === 'development') {
    initializeSwagger(app, port, serverUrl);
    logger.debug('Swagger initialized');
  } else {
    // disable debug logs in production
    logger.debug('Swagger not initialized');

    Logger.prototype.debug = () => undefined;
  }

  // enable cors
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization', 'Refresh-Token'],
    exposedHeaders: ['Content-Disposition'],
    origin: true, // Allow all origins
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(port);

  return port;
}

bootstrap()
  .then((port) => {
    logger.debug(`Application is running on: \n${serverUrl}`);

    if (process.env.NODE_ENV === 'development') {
      logger.debug(`Swagger is running on: \n${serverUrl}/api/doc`);
    }
  })
  .catch((error) => {
    logger.error(`Error: ${error}`);
  });
