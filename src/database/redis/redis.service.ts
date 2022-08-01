import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { CreateAISheetMessage } from 'src/messages/createAiSheet.message';
import { SET_PROGRESS_CONNECTION, PUBLISH_PROGRESS_CONNECTION } from './redis.provider';
import { SheetRepository } from 'src/repositories/sheet.repository';
import { SheetDataRepository } from 'src/repositories/sheetdata.repository';
import EventEmitter from 'events';

export interface ProgressInfo {
  videoId: string;
  status: number;
}

@Injectable()
export class RedisService {
  constructor(
    @Inject(PUBLISH_PROGRESS_CONNECTION) private connection: RedisClientType,
    @Inject(SET_PROGRESS_CONNECTION) private setConnection: RedisClientType,
  ) {}

  private async publishMessage(message: CreateAISheetMessage, channel: string) {
    await this.connection.publish(channel, message.status.toString());
  }
  private async setProgressStatus(message: CreateAISheetMessage, channel: string) {
    await this.setConnection.set(channel, message.status.toString());
  }

  private async checkAndSetProgressStatus(message: CreateAISheetMessage, channel: string) {
    Logger.log('Check and set progress status: ', message.status);
    // make it atomic prevent race condition
    await this.setConnection.watch(channel);
    const multi = this.setConnection.multi();
    const status: number = Number(await this.setConnection.get(channel));
    if (status >= message.status) {
      return;
    }
    await multi.set(channel, message.status.toString()).exec();
  }

  async renderUserProgressBar(message: CreateAISheetMessage, channel: string) {
    await this.checkAndSetProgressStatus(message, channel);
    await this.publishMessage(message, channel);
  }
}
