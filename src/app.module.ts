import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SheetService } from './services/sheet/sheet.service';
import { AxiosService } from './services/axios.service';
import { ChordService } from './services/chord/chord.service';
import { SeparateService } from './services/separate/separate.service';
import { ISeparateService } from './services/separate/separate.interface.service';
import { Axios } from 'axios';

@Module({
  imports: [  
    ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController],
  providers: [AppService,
    {provide: "ISeparateService", useClass: SeparateService},
     {provide: "ISheetService", useClass: SheetService},
      {provide: "IChordService", useClass: ChordService}, 
      AxiosService],
})

export class AppModule {}
