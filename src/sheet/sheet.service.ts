import { AxiosService } from "src/global/services/axios.service";
import { ConfigService } from "@nestjs/config";
import { Separate } from "src/entities/separate.entities";
import { convertPath } from "src/utils/path";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { PostSheetDto } from "src/dto/PostSheet.dto";
import { PostSheetResponseDto } from "src/dto/PostSheetResponse.dto";
import { Sheet } from "src/entities/sheet.entities";
import { RedisService } from "src/database/redis/redis.service";
import { Chord } from "src/entities/chord.entities";
import {ISheetService} from "src/sheet/sheet.service.interface"
import { CreateAISheetMessage } from "src/messages/createAiSheet.message";
import { SheetDataDocument } from "src/schemas/sheetData.schema";
import { SheetRepository } from "src/repositories/sheet.repository";
import { SheetDataRepository } from "src/repositories/sheetdata.repository";
export type GenerateMode = 'AUTO' | 'USER';

export type GenerateSheetDto = {
    wavPath: string;
    midiPath: string;
    videoInfo: PostSheetDto;
}

export type StageDoneHandlerType = (message: CreateAISheetMessage) => void;


export const SHEET_SERVER_PORT = 'SHEET_SERVER_PORT'
export const CHORD_SERVER_PORT = 'CHORD_SERVER_PORT'
export const SEPERATE_SERVER_PORT = 'SEPERATE_SERVER_PORT'

@Injectable()
export class SheetService implements ISheetService {
    constructor(private readonly axiosService: AxiosService,
     private configService: ConfigService, private readonly redisService: RedisService,
     private sheetRepository: SheetRepository,
     private sheetDataRepository: SheetDataRepository, 
     ) {}



    private async getWav(videoId: string, stageDoneHandler: StageDoneHandlerType): Promise<Separate> {
        const response: AxiosResponse<Separate> = await this.axiosService.getRequest<string, Separate>('http://separate:3000/separate', {videoId: videoId});
        stageDoneHandler({
          status: 1,
          payload: null
        })
        return response.data
    }   


    private async getChord(wavPath: string, progressDoneHandler: StageDoneHandlerType): Promise<Chord> {
      const response: Chord = (await this.axiosService.getRequest<string, Chord>('http://chord:3000/chord', {wavPath: wavPath})).data;
      progressDoneHandler({
        status: 2,
        payload: null
      })
      return response;
    }


  private async getSheet(videoId, chordInfo: Chord,progressDoneHandler: StageDoneHandlerType): Promise<Sheet> {
      const response = await (await this.axiosService.getRequest<Chord, Sheet>('http://sheet:3000/sheet', {
        csvPath: chordInfo.csvPath,
        midiPath: chordInfo.midiPath
      })).data;

      const sheetId: string = await (await this.sheetRepository.findSheetIdByVideoId(videoId))._id;

      await this.sheetDataRepository.create({
        _id: sheetId,
        bpm: response.bpm,
        chord_info: response.info
      })

      await progressDoneHandler({
        status: 3,
        payload: null
      })

      return response
  }


    async createSheet(sheetDto: PostSheetDto, mode: GenerateMode): Promise<PostSheetResponseDto> {
      //  Use Redis publish for progress
      const progressDoneHandler = (message: CreateAISheetMessage) => this.redisService.renderUserProgressBar(message, videoId);
        const {
          videoId,
          accompanimentPath
        }: Separate = await this.getWav(sheetDto.videoId, progressDoneHandler);

        const chord : Chord = await this.getChord(convertPath(accompanimentPath),progressDoneHandler);

        const sheet: Sheet = await this.getSheet(videoId, {
          csvPath: convertPath(chord.csvPath),
          midiPath: convertPath(chord.midiPath)
        },progressDoneHandler);

        const response: PostSheetResponseDto = {
          success: true,
          payload: sheet
        };
    
        return response;
      }
}

