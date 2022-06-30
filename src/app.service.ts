import { Injectable } from '@nestjs/common';
import { IChordService } from './services/chord/chord.interface.service';
import { ISheetService } from './services/sheet/sheet.interface.service';
import { ISeparateService } from './services/separate/separate.interface.service';
import { CreateSheetDto } from './dto/CreateSheet.dto';
import { CreateSheetResponseDto } from './dto/CreateSheetResponse.dto';
import { Inject } from '@nestjs/common';
import { Chord } from './entities/chord.entities';
import { Sheet } from './entities/sheet.entities';

@Injectable()
export class AppService {

  constructor(
     @Inject('IChordService')private chordService: IChordService,
     @Inject('ISeparateService') private separateService: ISeparateService,
     @Inject('ISheetService') private sheetService: ISheetService){
  }

  async getSheet(sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    
    const wavPath: string = await this.separateService.getWav(sheetDto.videoId);

    const chord : Chord = await this.chordService.getChord(wavPath);

    const sheet: Sheet = await this.sheetService.getSheet(chord);

    const response:CreateSheetResponseDto = {
      success: true,
      payload: sheet
    };

    return response;
  }
}
