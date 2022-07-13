import { Module } from '@nestjs/common';
import { MongoDBProvider } from './mongodb.providers';
import { MongoService } from './mongo.service';
import { SheetInfoRepository } from 'src/sheet/repositories/sheetinfo.repository';
@Module({
    providers: [...MongoDBProvider, MongoService, SheetInfoRepository],
    exports: [...MongoDBProvider, MongoService]
}) 
export class MongoModule {}
