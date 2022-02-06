import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { Logger } from 'nestjs-pino';
import { logger } from './common/logger';

import { USE_FASTIFY, PORT } from './common/app.config';

async function runFastify() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger }),
  );
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT, '0.0.0.0');
}

async function runExpress() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT, () =>
    console.log(`Starting server on port = ${PORT} 🚀 `),
  );
}

function bootstrap() {
  if (!USE_FASTIFY) {
    runExpress();
  } else {
    runFastify();
  }
}
bootstrap();
