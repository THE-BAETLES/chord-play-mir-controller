import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeparateService } from './services/separate.service';
import { AxiosService } from './services/axios.service';
import { SheetService } from './services/sheet.service';
import { ChordService } from './services/chord.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [  
    ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController],
  providers: [AppService,SeparateService, AxiosService, SheetService, ChordService],
})

export class AppModule {}
