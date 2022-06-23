import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSheetDto } from './dto/CreateSheet.dto';
import { CreateSheetResponseDto } from './dto/CreateSheetResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sheet')
  async getSheet(@Body() sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    return this.appService.getSheet(sheetDto);
  }
}
