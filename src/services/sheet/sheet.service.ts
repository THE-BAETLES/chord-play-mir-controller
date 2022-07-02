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

export type GenerateSheetDto = {
    wavPath: string;
    midiPath: string;
    videoInfo: CreateSheetDto;
}

@Injectable()
export class SheetService{
    constructor(private readonly axiosService: AxiosService,
     private configService: ConfigService) {}

    private async getChord(wavPath: string): Promise<Chord> {
        const port= this.configService.get<string>('CHORD_SERVER_PORT')
        const response: Chord = (await this.axiosService.getRequest<string, Chord>('/chord', {wavPath: wavPath}, Number(port))).data;
        Logger.log('chord retrieval response = ', response);
        return response;
    }
    

    private async getSheet(chordInfo: Chord): Promise<Sheet> {
        const port= this.configService.get<string>('SHEET_SERVER_PORT');

        // csvPath <-> midiPath
        const response = await this.axiosService.getRequest<Chord,Sheet>('/sheet', {
            csvPath: chordInfo.csvPath,
            midiPath: chordInfo.midiPath
        }, Number(port));

        Logger.log('sheet data reponse = ', response.data);

        return response.data
    }

    private async getWav(videoId: string): Promise<Separate> {
        Logger.log(`separate start videoId = ${videoId}`);
        const port= this.configService.get<string>('SEPARATE_SERVER_PORT')
        const response: AxiosResponse<Separate> = await this.axiosService.getRequest<string, Separate>('/separate', {videoId: videoId}, Number(port));
        Logger.log(`separate response = `, response.data);
        return response.data
    }   

    async createSheet(sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    
        const {
          videoId,
          accompanimentPath
        }: Separate = await this.getWav(sheetDto.videoId);
        
        const chord : Chord = await this.getChord(convertPath(accompanimentPath));
    
        const sheet: Sheet = await this.getSheet({
          csvPath: convertPath(chord.csvPath),
          midiPath: convertPath(chord.midiPath)
        });
    
        const response:CreateSheetResponseDto = {
          success: true,
          payload: sheet
        };
    
        return response;
      }
}

