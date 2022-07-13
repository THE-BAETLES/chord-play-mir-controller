import { Module } from '@nestjs/common';
import { SQSModule } from 'src/aws/sqs/sqs.module';
import { MongoDBProvider } from 'src/database/mongo/mongodb.providers';
import { RedisService } from 'src/database/redis/redis.service';
import { AxiosService } from 'src/global/services/axios.service';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';
import { RedisModule } from 'src/database/redis/redis.module';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { SheetInfoRepository } from './repositories/sheetinfo.repository';
@Module({
    imports: [
        SQSModule, RedisModule, MongoModule
    ],
    controllers: [SheetController],
    providers: [SheetService, SheetInfoRepository, AxiosService, RedisService],
    exports: [SheetService, SheetInfoRepository]
})
export class SheetModule {}
