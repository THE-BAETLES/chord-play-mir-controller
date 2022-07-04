import { Body, Controller, Logger, Post } from '@nestjs/common';
import { request } from 'http';
import { CreateSheetDto } from 'src/dto/CreateSheet.dto';
import { CreateSheetResponseDto } from 'src/dto/CreateSheetResponse.dto';
import { SheetService } from './sheet.service';

@Controller('sheet')
export class SheetController {
    constructor(private sheetService: SheetService)
    {
        
    }

    @Post()
    async createSheet(@Body() sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
      const sheet = await this.sheetService.createSheet(sheetDto);
      return sheet
    }
}
