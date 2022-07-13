import { AxiosService } from "src/global/services/axios.service";
import { ConfigService } from "@nestjs/config";
import { Separate } from "src/entities/separate.entities";
import { convertPath } from "src/utils/path";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Logger } from "@nestjs/common";
import { PostSheetDto } from "src/dto/PostSheet.dto";
import { PostSheetResponseDto } from "src/dto/PostSheetResponse.dto";
import { Sheet } from "src/entities/sheet.entities";
import { RedisService } from "src/database/redis/redis.service";
import { Chord } from "src/entities/chord.entities";

export type GenerateMode = 'AUTO' | 'USER';

export type GenerateSheetDto = {
    wavPath: string;
    midiPath: string;
    videoInfo: PostSheetDto;
}

export const SHEET_SERVER_PORT = 'SHEET_SERVER_PORT'
export const CHORD_SERVER_PORT = 'CHORD_SERVER_PORT'
export const SEPERATE_SERVER_PORT = 'SEPERATE_SERVER_PORT'

@Injectable()
export class SheetService{
    constructor(private readonly axiosService: AxiosService,
     private configService: ConfigService, private readonly redisService: RedisService
     ) {}

    private async getChord(wavPath: string): Promise<Chord> {
        const port= this.configService.get<string>(CHORD_SERVER_PORT)
        // request path config 로 분류
        const response: Chord = (await this.axiosService.getRequest<string, Chord>('http://chord:3000/chord', {wavPath: wavPath})).data;
        Logger.log('chord retrieval response = ', response);
        return response;
    }
    
    private async getSheet(chordInfo: Chord): Promise<Sheet> {
        // string lateral 에러 발생률이 큼
        const port= this.configService.get<string>(SHEET_SERVER_PORT);

        Logger.log("csvPath = ", chordInfo.csvPath);
        
        // csvPath <-> midiPath
        const response = await this.axiosService.getRequest<Chord,Sheet>('http://sheet:3000/sheet', {
            csvPath: chordInfo.csvPath,
            midiPath: chordInfo.midiPath
        });

        Logger.log('sheet data reponse = ', response.data);
        return response.data
    }

    private async getWav(videoId: string): Promise<Separate> {
        
        Logger.log(`separate start videoId = ${videoId}`);
        const port= this.configService.get<string>(SEPERATE_SERVER_PORT);
        const response: AxiosResponse<Separate> = await this.axiosService.getRequest<string, Separate>('http://separate:3000/separate', {videoId: videoId});
        Logger.log(`separate response = `, response.data);

        return response.data
    }   

    private async renderUserProgressBar(videoId: string, status: number){
      // this.redisService.send({videoId: videoId, status: status})
    }


    async createSheet(sheetDto: PostSheetDto, mode: GenerateMode): Promise<PostSheetResponseDto> {
      //  Use Redis publish for progress
        const {
          videoId,
          accompanimentPath
        }: Separate = await this.getWav(sheetDto.videoId);


        (mode === 'USER') && this.renderUserProgressBar(videoId, 0)
        // callback event driven 방식으로 구현
        // status를 콜하는 부분을 추상화 시키기
        const chord : Chord = await this.getChord(convertPath(accompanimentPath));

        (mode === 'USER') && this.renderUserProgressBar(videoId, 1)

        const sheet: Sheet = await this.getSheet({
          csvPath: convertPath(chord.csvPath),
          midiPath: convertPath(chord.midiPath)
        });

        (mode === 'USER') && this.renderUserProgressBar(videoId, 2)

        
        const response: PostSheetResponseDto = {
          success: true,
          payload: sheet
        };
    
        return response;
      }
}

