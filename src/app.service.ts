import { Injectable } from '@nestjs/common';
import { IChordService } from './services/chord.interface.service';
import { ISeparateService } from './services/separate.interface.service';
import { ISheetService } from './services/sheet.interface.service';
import { CreateSheetDto } from './dto/CreateSheet.dto';
import { CreateSheetResponseDto } from './dto/CreateSheetResponse.dto';
@Injectable()
export class AppService {

  constructor(private chordService: IChordService,
     private separateService: ISeparateService, private sheetService: ISheetService){
  }

  async getSheet(sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    
    const wavPath: string = await this.separateService.getWav(sheetDto.videoId);

    const midiPath: string = await this.chordService.getMidi(wavPath);

    const sheet: any = await this.sheetService.getSheet(wavPath,midiPath,sheetDto);

    const response = sheet.data;

    return response
  }
}
