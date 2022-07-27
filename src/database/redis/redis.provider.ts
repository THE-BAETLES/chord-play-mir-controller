import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {createClient} from "redis";
import { RedisConfigType } from "src/configs/redis.config";

export const progressProvider = [{
    provide: 'PROGRESS_CONNECTION',
    useFactory: async (configuration: ConfigService) => {
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