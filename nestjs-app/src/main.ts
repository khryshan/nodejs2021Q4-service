import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { Logger } from 'nestjs-pino';

import { PORT } from './common/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );

  await app.listen(PORT, () => console.log(`Starting server on port = ${PORT} 🚀 `));
}
bootstrap();
