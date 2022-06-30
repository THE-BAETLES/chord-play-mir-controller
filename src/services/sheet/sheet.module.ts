import { Module } from '@nestjs/common';
import { AxiosService } from '../axios.service';
import { ChordModule } from '../chord/chord.module';
import { SeparateModule } from '../separate/separate.module';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';

@Module({
    controllers: [SheetController],
    providers: [SheetService, AxiosService],
})
export class SheetModule {}
