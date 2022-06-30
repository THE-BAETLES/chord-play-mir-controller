import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsUploadService } from './aws.upload.service';

@Module({
  controllers: [AwsController],
  exports: [
    
  ]
})

export class AwsModule {}
