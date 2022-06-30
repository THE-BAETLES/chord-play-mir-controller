import { Module } from '@nestjs/common';
import { AxiosService } from '../axios.service';
import { SeparateController } from './separate.controller';
import { SeparateService } from './separate.service';

@Module({
  controllers: [SeparateController],
  providers: [SeparateService,  AxiosService]
})
export class SeparateModule {}
