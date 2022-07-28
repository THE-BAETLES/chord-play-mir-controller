import * as mongoose from "mongoose"
import { ConfigService } from "@nestjs/config"
import {MongoConfigType} from "src/configs/mongo.config"
import { Logger } from "@nestjs/common"
export const MONGO_CONNECTION = 'MONGO_CONNECTION';
export const MongoDBProvider = [{
    provide: MONGO_CONNECTION,
    useFactory: (configuration: ConfigService): Promise<typeof mongoose> => {
        Logger.log("Mongo connection start");
        const {user, password, endpoint} = configuration.get<MongoConfigType>('mongo');
        return mongoose.connect(`mongodb://${user}:${password}@${endpoint}`,{
            'dbName': 'chordplay'
        });
    },
    inject: [ConfigService]
}]

