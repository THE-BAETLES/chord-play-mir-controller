import { Module } from '@nestjs/common';
import { MongoDBProvider } from './mongodb.providers';
import { MongoService } from './mongo.service';
import { sheetDataProvider } from 'src/sheet/sheetdata.providers';
import { SheetDataRepository } from 'src/repositories/sheetdata.repository';

@Module({
  providers: [...MongoDBProvider, MongoService],
  exports: [...MongoDBProvider, MongoService],
})
export class MongoModule {}
