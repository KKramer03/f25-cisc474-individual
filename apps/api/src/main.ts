import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cors } from './cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;

  app.enableCors(cors);

  await app.listen(port, host);
}

void bootstrap();
