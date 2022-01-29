import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { PORT } from './common/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Starting server on port = ${PORT} 🚀 `));
}
bootstrap();
