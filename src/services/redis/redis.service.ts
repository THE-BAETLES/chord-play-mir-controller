import { Injectable } from "@nestjs/common";
import { RedisClientType } from "@redis/client";
import { createClient } from "redis";


export interface ProgressInfo {
    videoId: string;
    status: number;
}

export const REDIS_PROGRESS_CHANEL =  'REDIS_PROGRESS_CHANEL'

@Injectable()
export class RedisService {
    private client: RedisClientType

    constructor(){
        this.client = createClient({url: process.env.REDIS_ENDPOINT})
        this.client.connect()
    }

    async send(message: ProgressInfo){
        this.saveVideoStatus(message)
        this.sendMessage(message)
    }

    async sendMessage(message: ProgressInfo){
        this.client.PUBLISH(`REDIS_PROGRESS_CHANEL_${message.videoId}`, message.status.toString())
    }

    async saveVideoStatus(message: ProgressInfo){
        this.client.SET(message.videoId, message.status, {
        })
    }

}