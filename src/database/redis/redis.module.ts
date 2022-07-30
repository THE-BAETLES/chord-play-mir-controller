import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { progressProvider } from './redis.provider';
import { MongoModule } from '../mongo/mongo.module';
import { sheetDataProvider } from 'src/sheet/sheetdata.providers';
import { SheetRepository } from 'src/repositories/sheet.repository';
import { SheetDataRepository } from 'src/repositories/sheetdata.repository';
@Module({
  imports: [MongoModule],
  providers: [RedisService, ...progressProvider, ...sheetDataProvider, SheetRepository, SheetDataRepository],
  exports: [RedisService, ...progressProvider],
})
export class RedisModule {}
