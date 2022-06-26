import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSheetDto } from './dto/CreateSheet.dto';
import { CreateSheetResponseDto } from './dto/CreateSheetResponse.dto';
import { Sheet } from './entities/sheet.entities';
import { IAwsUploadService } from './services/aws/aws.interface.upload.service';
import { AwsUploadService } from './services/aws/aws.upload.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,  private uploadService: AwsUploadService) {

  }

  @Post('/sheet')
  async getSheet(@Body() sheetDto: CreateSheetDto): Promise<CreateSheetResponseDto> {
    const sheet = await this.appService.getSheet(sheetDto);

    return 
  }
}
