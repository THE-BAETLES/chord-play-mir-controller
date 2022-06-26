import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
