import { AxiosService } from 'src/global/services/axios.service';
import { ConfigService } from '@nestjs/config';
import { Separate } from 'src/entities/separate.entities';
import { convertPath } from 'src/utils/path';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { PostSheetDto } from 'src/dto/PostSheet.dto';
import { PostSheetResponseDto } from 'src/dto/PostSheetResponse.dto';
import { Sheet } from 'src/entities/sheet.entities';
import { ObjectId } from 'mongoose';
import { RedisService } from 'src/database/redis/redis.service';
import { Chord } from 'src/entities/chord.entities';
import { ISheetService } from 'src/sheet/sheet.service.interface';
import { CreateAISheetMessage } from 'src/messages/createAiSheet.message';
import { SheetRepository } from 'src/repositories/sheet.repository';
import { SheetDataRepository } from 'src/repositories/sheetdata.repository';
import { SQSService } from 'src/aws/sqs/sqs.service';
import { BeatInfo } from 'src/entities/beatInfo.entities';
export type GenerateMode = 'AUTO' | 'USER';

export type GenerateSheetDto = {
  wavPath: string;
  midiPath: string;
  videoInfo: PostSheetDto;
};

export type StageDoneHandlerType = (message: CreateAISheetMessage) => void;

export const SHEET_SERVER_PORT = 'SHEET_SERVER_PORT';
export const CHORD_SERVER_PORT = 'CHORD_SERVER_PORT';
export const SEPERATE_SERVER_PORT = 'SEPERATE_SERVER_PORT';

@Injectable()
export class SheetService implements ISheetService {
  constructor(
    private readonly axiosService: AxiosService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
    private sheetRepository: SheetRepository,
    private sheetDataRepository: SheetDataRepository,
    private sqsService: SQSService,
  ) {}

  private async getWav(videoId: string, stageDoneHandler: StageDoneHandlerType): Promise<Separate> {
    Logger.log('Get Wav Start!!');
    const separateURL = this.configService.get<string>('inference.separateURL');
    console.log('SeparateURL = ', separateURL);

    const response: AxiosResponse<Separate> = await this.axiosService.getRequest<string, Separate>(`http://${separateURL}/separate`, { videoId: videoId });
    stageDoneHandler({
      status: 1,
    });
    return response.data;
  }

  private async getChord(wavPath: string, stageDoneHandler: StageDoneHandlerType): Promise<Chord> {
    Logger.log('Get Chord Start!!');
    const retrievalURL = this.configService.get<string>('inference.retrievalURL');
    const response: Chord = (await this.axiosService.getRequest<string, Chord>(`http://${retrievalURL}/chord`, { wavPath: wavPath })).data;
    stageDoneHandler({
      status: 2,
    });
    return response;
  }

  private async getBeatInfo(wavPath: string): Promise<BeatInfo> {
    Logger.log('Get BeatInfo Start!!');
    const beatURL = this.configService.get<string>('inference.beatURL');
    const response = await (await await this.axiosService.getRequest<string, BeatInfo>(`http://${beatURL}/beat`, { wavPath: wavPath })).data;
    return response;
  }

  private async getSheet(videoId, chordInfo: Chord, beatInfo: BeatInfo, stageDoneHandler: StageDoneHandlerType): Promise<Sheet> {
    Logger.log('Get Sheet Start!!');
    const sheetURL = this.configService.get<string>('inference.sheetURL');
    const response = await (
      await this.axiosService.getRequest<Chord, Sheet>(`http://${sheetURL}/sheet`, {
        csvPath: chordInfo.csvPath,
        midiPath: chordInfo.midiPath,
        bpm: beatInfo.bpm,
        beats: beatInfo.beats,
      })
    ).data;

    await this.createSheetData(videoId, response);
    await stageDoneHandler({
      status: 3,
    });
    return response;
  }

  private async createSheetData(videoId, sheetData: Sheet) {
    Logger.log('Create Sheet Start!!3');
    const sheetId: ObjectId = await (await this.sheetRepository.findSheetIdByVideoId(videoId))._id;

    Logger.log(`videoId = ${videoId} sheetId = ${sheetId}`);
    await this.sheetDataRepository.create({
      _id: sheetId,
      bpm: sheetData.bpm,
      beat_infos: sheetData.beatInfos,
      chord_infos: sheetData.chordInfos,
    });
  }

  async startCreateSheet(sheetDto: PostSheetDto): Promise<PostSheetResponseDto> {
    // 에러 핸들링
    //  Use Redis publish for progress
    const stageDoneHandler = async (message: CreateAISheetMessage) => await this.redisService.renderUserProgressBar(message, sheetDto.videoId);

    const { videoId, accompanimentPath }: Separate = await this.getWav(sheetDto.videoId, stageDoneHandler);

    const wavPath = convertPath(accompanimentPath);
    const chord: Chord = await this.getChord(wavPath, stageDoneHandler);
    const beatInfo: BeatInfo = await this.getBeatInfo(wavPath);

    const sheet: Sheet = await this.getSheet(
      videoId,
      {
        csvPath: convertPath(chord.csvPath),
        midiPath: convertPath(chord.midiPath),
      },
      beatInfo,
      stageDoneHandler,
    );

    const response: PostSheetResponseDto = {
      success: true,
      payload: sheet,
    };

    return response;
  }
  async startMessagePolling() {
    while (true) {
      // Long polling
      const sqsMessage = await this.sqsService.receiveMessage();
      if (sqsMessage.Messages === undefined) continue;
      const message = sqsMessage.Messages[0];
      const videoId = message.Body;
      const receiptHandle = message.ReceiptHandle;

      console.log('Start Polling', message, videoId, receiptHandle);
      try {
        await this.startCreateSheet({ videoId: videoId });
      } catch (e) {
        Logger.log('Error occur', e);
      } finally {
        await this.sqsService.deleteMessage(receiptHandle);
      }
    }
  }

  async databaseTest() {
    const sheetId: ObjectId = await (await this.sheetRepository.findSheetIdByVideoId('KZH-MpiwmaU'))._id;
    console.log('Test sheetId = ', sheetId);
  }

  async startServer() {
    this.startMessagePolling();
  }
}
