import { Injectable } from '@nestjs/common';
import { IChordService } from './services/chord/chord.interface.service';
import { ISheetService } from './services/sheet/sheet.interface.service';
import { ISeparateService } from './services/separate/separate.interface.service';
import { CreateSheetDto } from './dto/CreateSheet.dto';
import { CreateSheetResponseDto } from './dto/CreateSheetResponse.dto';
import { Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
     @Inject('IChordService')private chordService: IChordService,
     @Inject('ISeparateService') private separateService: ISeparateService,
     @Inject('ISheetService') private sheetService: ISheetService){
  }

  async getSheet(sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    
    const wavPath: string = await this.separateService.getWav(sheetDto.videoId);

    const midiPath: string = await this.chordService.getMidi(wavPath);

    const sheet: any = await this.sheetService.getSheet(wavPath,midiPath,sheetDto);

    const response = sheet.data;

    return response
  }
}
