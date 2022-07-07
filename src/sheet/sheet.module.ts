import { Module } from '@nestjs/common';
import { AxiosService } from 'src/global/services/axios.service';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';


@Module({
    controllers: [SheetController],
    providers: [SheetService, AxiosService],
})
export class SheetModule {}