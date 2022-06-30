import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SheetModule } from './services/sheet/sheet.module';

@Module({
  imports: [  
    ConfigModule.forRoot({
    isGlobal: true,
  }), SheetModule]
})

export class AppModule {}
