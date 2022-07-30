import { Module } from '@nestjs/common';
import { SQSModule } from 'src/aws/sqs/sqs.module';
import { RedisService } from 'src/database/redis/redis.service';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';
import { RedisModule } from 'src/database/redis/redis.module';
import { AxiosService } from '../global/services/axios.service';
import { MongoModule } from '../database/mongo/mongo.module';
import { sheetDataProvider } from './sheetdata.providers';
import { SheetDataRepository } from 'src/repositories/sheetdata.repository';
import { SheetRepository } from 'src/repositories/sheet.repository';
@Module({
  imports: [SQSModule, RedisModule, MongoModule],
  controllers: [SheetController],
  providers: [SheetService, SheetDataRepository, AxiosService, RedisService, ...sheetDataProvider, SheetRepository],
  exports: [SheetService, SheetDataRepository, AxiosService, RedisService, ...sheetDataProvider, SheetRepository],
})
export class SheetModule {}
