import * as AWS from 'aws-sdk';
import { AwsConfigType } from 'src/configs/aws.config';
import { ConfigService } from '@nestjs/config';
import { SQSClient } from '@aws-sdk/client-sqs';

export const SQS_CLIENT = 'SQS_CLIENT';

export const SQSProvider = [
  {
    provide: SQS_CLIENT,
    useFactory: async (config: ConfigService): Promise<SQSClient> => {
      console.log('Start Aws sqs!');
      const { aws, sqs } = config.get<AwsConfigType>('aws');
      return new SQSClient({
        region: aws.region,
        endpoint: sqs.url,
        credentials: {
          accessKeyId: aws.accessKeyId,
          secretAccessKey: aws.secretKey,
        },
      });
    },
    inject: [ConfigService],
  },
];
