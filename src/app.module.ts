import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SheetModule } from './sheet/sheet.module';
import configuration from './configs/configuration';
@Module({
  imports: [  
    ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }), SheetModule]
})

export class AppModule {}
