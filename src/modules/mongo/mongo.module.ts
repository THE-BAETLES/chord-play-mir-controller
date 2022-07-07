import { Module } from '@nestjs/common';
import { MongoDBProvider } from 'src/providers/mongodb.providers';
@Module({
    providers: [...MongoDBProvider],
    exports: [...MongoDBProvider]
}) 
export class MongoModule {}
