import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "@redis/client";
import { CreateAISheetMessage } from "src/messages/createAiSheet.message";
import { SET_PROGRESS_CONNECTION, PUBLISH_PROGRESS_CONNECTION } from "./redis.provider";
import { SheetRepository } from "src/repositories/sheet.repository";
import { SheetDataRepository } from "src/repositories/sheetdata.repository";
import EventEmitter from "events";

export interface ProgressInfo {
    videoId: string;
    status: number;
}


@Injectable()
export class RedisService {
    
    constructor(
    @Inject(PUBLISH_PROGRESS_CONNECTION) private connection: RedisClientType,        
    @Inject(SET_PROGRESS_CONNECTION) private setConnection: RedisClientType,){
    }

    private async publishMessage(message: CreateAISheetMessage, channel: string) {
        await this.connection.publish(message.status.toString(), channel)
    }
    private async setProgressStatus(message: CreateAISheetMessage,channel: string) {
        await this.setConnection.set(channel, message.status.toString());
    }

    async renderUserProgressBar(message: CreateAISheetMessage, channel: string) {
        await this.publishMessage(message, channel);
        await this.setProgressStatus(message, channel);
    }

  
}