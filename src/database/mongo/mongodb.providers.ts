import * as mongoose from "mongoose"
import { ConfigService } from "@nestjs/config"
import {MongoConfigType} from "src/configs/mongo.config"
import { Logger } from "@nestjs/common"

export const MongoDBProvider = [{
    provide: 'MONGO_CONNECTION',
    useFactory: (configuration: ConfigService): Promise<typeof mongoose> => {
        Logger.log("Mongo connection start");
        const {user, port, password, endpoint, database} = configuration.get<MongoConfigType>('mongo');
        return mongoose.connect(`mongodb://${user}:${password}@${endpoint}:${port}/${database}`)
    },
    inject: [ConfigService]
}]

