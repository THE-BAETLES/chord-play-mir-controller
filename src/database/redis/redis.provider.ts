import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {createClient} from "redis";
import { RedisConfigType } from "src/configs/redis.config";
import { getURI } from "utils/path";

export const PUBLISH_PROGRESS_CONNECTION = 'PUBLISH_PROGRESS_CONNECTION';
export const SET_PROGRESS_CONNECTION ='SET_PROGRESS_CONNECTION';
export const progressProvider = [{
    provide: PUBLISH_PROGRESS_CONNECTION,
    useFactory: async (configuration: ConfigService) => {
        Logger.log("Redis Connect start");
        const {endpoint, port} = configuration.get<RedisConfigType>('redis');
        const uri = getURI({protocol: 'redis', host: endpoint, port: port});
        const client = createClient({
            url: uri
        })
        client.on('error', () => {
            Logger.log("Redis connection error");
        })
        await client.connect();
        return client
    },
    inject: [ConfigService]
},
{
    provide: SET_PROGRESS_CONNECTION ,
    useFactory: async (configuration: ConfigService) => {
        Logger.log("Redis Connect start");
        const {endpoint, port} = configuration.get<RedisConfigType>('redis');
        const uri = getURI({protocol: 'redis', host: endpoint, port: port});
        const client = createClient({
            url: uri
        })
        client.on('error', () => {
            Logger.log("Redis connection error");
        })
        await client.connect();
        return client
    },
    inject: [ConfigService]
}]