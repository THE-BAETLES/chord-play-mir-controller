import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from "dotenv"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(1000);
}
bootstrap();
