import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PostSheetDto } from 'src/dto/PostSheet.dto';
import { PostSheetResponseDto } from 'src/dto/PostSheetResponse.dto';

import { SheetService } from './sheet.service';
@Controller('sheet')
export class SheetController {
  constructor(private sheetService: SheetService) {}
}
