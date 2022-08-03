import { AxiosService } from 'src/global/services/axios.service';
import { ConfigService } from '@nestjs/config';
import { Separate } from 'src/entities/separate.entities';
import { convertPath } from 'src/utils/path';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { PostSheetDto } from 'src/dto/PostSheet.dto';
import { PostSheetResponseDto } from 'src/dto/PostSheetResponse.dto';
import { Sheet } from 'src/entities/sheet.entities';
import { RedisService } from 'src/database/redis/redis.service';
import { Chord } from 'src/entities/chord.entities';
import { ISheetService } from 'src/sheet/sheet.service.interface';
import { CreateAISheetMessage } from 'src/messages/createAiSheet.message';
import { SheetRepository } from 'src/repositories/sheet.repository';
import { SheetDataRepository } from 'src/repositories/sheetdata.repository';
import { SQSService } from 'src/aws/sqs/sqs.service';
import { ListBucketIntelligentTieringConfigurationsRequest } from '@aws-sdk/client-s3';
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

  private async getSheet(videoId, chordInfo: Chord, stageDoneHandler: StageDoneHandlerType): Promise<Sheet> {
    Logger.log('Get Sheet Start!!');
    const sheetURL = this.configService.get<string>('inference.sheetURL');

    const response = await (
      await this.axiosService.getRequest<Chord, Sheet>(`http://${sheetURL}/sheet`, {
        csvPath: chordInfo.csvPath,
        midiPath: chordInfo.midiPath,
      })
    ).data;

    await this.createSheetData(videoId, response);
    await stageDoneHandler({
      status: 3,
    });
    return response;
  }

  private async createSheetData(videoId, sheetData: Sheet) {
    Logger.log('Create Sheet Start!!');
    const sheetId: string = await (await this.sheetRepository.findSheetIdByVideoId(videoId))._id;
    const sheetDataId = this.sheetDataRepository;
    await this.sheetDataRepository.create({
      _id: sheetId,
      bpm: sheetData.bpm,
      chord_infos: sheetData.info,
    });
  }

  async requestCreateSheet(sheetDto: PostSheetDto): Promise<PostSheetResponseDto> {
    // 에러 핸들링
    Logger.log('Create Sheet Start!!');
    //  Use Redis publish for progress
    const stageDoneHandler = async (message: CreateAISheetMessage) => await this.redisService.renderUserProgressBar(message, sheetDto.videoId);
    const { videoId, accompanimentPath }: Separate = await this.getWav(sheetDto.videoId, stageDoneHandler);
    const chord: Chord = await this.getChord(convertPath(accompanimentPath), stageDoneHandler);
    const sheet: Sheet = await this.getSheet(
      videoId,
      {
        csvPath: convertPath(chord.csvPath),
        midiPath: convertPath(chord.midiPath),
      },
      stageDoneHandler,
    );

    const response: PostSheetResponseDto = {
      success: true,
      payload: sheet,
    };

    return response;
  }

  async startServer() {
    while (true) {
      // Long polling
      const sqsMessage = await this.sqsService.receiveMessage();
      if (sqsMessage.Messages === undefined) continue;
      const message = sqsMessage.Messages[0];
      const videoId = message.Body;
      const receiptHandle = message.ReceiptHandle;
      // 수신 핸들이 만료되면 메시지가 대기열로 돌아갑니다
      // 결국 가시성 시간 제한 기간 내에 메세지를 삭제해야 함

      // 에러 핸들링 해야함
      // 1. visibility time 지나서 처리되는 경우
      // 2. 항상 잘못된 message -> 삭제 -> 오류 () 확률상 잘못된 message -> 다시 큐에 올림
      // 3. 어떤 request 든 N 번이상 큐에 들어갈 수 없음 (message의 metadata를 사용해서 처리 할 수 있을까?)

      // 피드백
      // 프론트엔드 상관없이 벡엔드만 봤을 때 오류 없는 코드를 작성해야 함
      // 최대한 예외 상황을 생각해보고 막아야 함
      // input value validation check 를 해줘야 함 (nest pipe decorater사용)
      try {
        await this.requestCreateSheet({ videoId: videoId });
      } catch (e) {
        Logger.log('Error occur');
      } finally {
        await this.sqsService.deleteMessage(receiptHandle);
      }
    }
  }
}
