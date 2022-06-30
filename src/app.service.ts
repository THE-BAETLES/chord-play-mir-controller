import { Injectable } from '@nestjs/common';
import { IChordService } from './services/chord/chord.interface.service';
import { ISheetService } from './services/sheet/sheet.interface.service';
import { ISeparateService } from './services/separate/separate.interface.service';
import { CreateSheetDto } from './dto/CreateSheet.dto';
import { CreateSheetResponseDto } from './dto/CreateSheetResponse.dto';
import { Inject } from '@nestjs/common';
import { Chord } from './entities/chord.entities';
import { Sheet } from './entities/sheet.entities';
import { Separate } from './entities/separate.entities';
import { convertPath } from './utils/path';

@Injectable()
export class AppService {

  constructor(
     @Inject('IChordService')private chordService: IChordService,
     @Inject('ISeparateService') private separateService: ISeparateService,
     @Inject('ISheetService') private sheetService: ISheetService){
  }

  async getSheet(sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    
    const {
      videoId,
      accompanimentPath
    }: Separate = await this.separateService.getWav(sheetDto.videoId);

    const chord : Chord = await this.chordService.getChord(convertPath(accompanimentPath));

    const sheet: Sheet = await this.sheetService.getSheet({
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
