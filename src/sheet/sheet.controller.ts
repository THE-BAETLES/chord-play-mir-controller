import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PostSheetDto } from 'src/dto/PostSheet.dto';
import { PostSheetResponseDto } from 'src/dto/PostSheetResponse.dto';

import { SheetService } from './sheet.service';
@Controller('sheet')
export class SheetController {
  constructor(private sheetService: SheetService) {}
  @Post()
  // Update this looking aws message queue service
  async createSheet(@Body() sheetDto: PostSheetDto): Promise<PostSheetResponseDto> {
    const sheet = await this.sheetService.requestCreateSheet(sheetDto);
    return sheet;
  }

  @Post('/auto')
  async autoCreateSheet(@Body() sheetDto: PostSheetDto): Promise<PostSheetResponseDto> {
    const sheet = await this.sheetService.requestCreateSheet(sheetDto);
    return sheet;
  }
}
