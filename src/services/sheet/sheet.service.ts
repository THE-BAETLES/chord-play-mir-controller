import { CreateSheetDto } from "src/dto/CreateSheet.dto";
import { AxiosService } from "../axios.service";
import { Sheet } from "src/entities/sheet.entities";
import { ConfigService } from "@nestjs/config";
import { Chord } from "src/entities/chord.entities";
import { CreateSheetResponseDto } from "src/dto/CreateSheetResponse.dto";
import { Separate } from "src/entities/separate.entities";
import { convertPath } from "src/utils/path";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Logger } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

export type GenerateSheetDto = {
    wavPath: string;
    midiPath: string;
    videoInfo: CreateSheetDto;
}

@Injectable()
export class SheetService{
    constructor(private readonly axiosService: AxiosService,
     private configService: ConfigService, private readonly redisService: RedisService) {}

    private async getChord(wavPath: string): Promise<Chord> {
        const port= this.configService.get<string>('CHORD_SERVER_PORT')
        const response: Chord = (await this.axiosService.getRequest<string, Chord>('http://chord:3000/chord', {wavPath: wavPath})).data;
        Logger.log('chord retrieval response = ', response);
        return response;
    }
    

    private async getSheet(chordInfo: Chord): Promise<Sheet> {
        const port= this.configService.get<string>('SHEET_SERVER_PORT');

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
        const port= this.configService.get<string>('SEPARATE_SERVER_PORT');
        const response: AxiosResponse<Separate> = await this.axiosService.getRequest<string, Separate>('http://separate:3000/separate', {videoId: videoId});
        Logger.log(`separate response = `, response.data);
        return response.data
    }   

    async createSheet(sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
        const {
          videoId,
          accompanimentPath
        }: Separate = await this.getWav(sheetDto.videoId);

        this.redisService.send({videoId: videoId, status: 1})

        const chord : Chord = await this.getChord(convertPath(accompanimentPath));
        
        this.redisService.send({videoId: videoId, status: 2})
        
        const sheet: Sheet = await this.getSheet({
          csvPath: convertPath(chord.csvPath),
          midiPath: convertPath(chord.midiPath)
        });

        this.redisService.send({videoId: videoId, status: 3})
    
        const response: CreateSheetResponseDto = {
          success: true,
          payload: sheet
        };
    
        return response;
      }
}

