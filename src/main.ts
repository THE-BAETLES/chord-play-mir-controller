import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SheetModule } from './sheet/sheet.module';
import { SheetService } from './sheet/sheet.service';

const port = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sqsService = app.select(SheetModule).get(SheetService);
  
  await app.listen(port);
}
bootstrap();
