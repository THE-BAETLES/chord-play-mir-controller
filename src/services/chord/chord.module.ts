import { Controller, Module } from '@nestjs/common';
import { AwsUploadService } from '../aws/aws.upload.service';
import { AxiosService } from '../axios.service';
import { ChordController } from './chord.controller';
import { ChordService } from './chord.service';

@Module({
    controllers: [ChordController],
    providers: [ChordService, AxiosService]
})

export class ChordModule {
}
