import { AwsConfigType } from './aws.config';
import { MongoConfigType } from './mongo.config';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ServerConfigType } from './server.config';
import { Logger } from '@nestjs/common';
import { RedisConfigType } from './redis.config';
import { InferenceServiceConfigType } from './inferenceService.config';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.development.env' });
  Logger.log('.development.env');
} else {
  dotenv.config({ path: '.production.env' });
}

export interface ConfigType {
  port: string;
  aws: AwsConfigType;
  mongo: MongoConfigType;
  server: ServerConfigType;
  redis: RedisConfigType;
  inference: InferenceServiceConfigType;
}

export default (): ConfigType => ({
  port: process.env.SERVER_PORT,
  aws: {
    aws: {
      region: process.env.AWS_REGION || 'ap-northeast-2',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_KEY,
    },
    sqs: {
      url: process.env.INFERENCE_QUEUE_URL,
      apiVersion: process.env.INFERENCE_SQS_API_VERSION || '2012-11-05',
    },
  },
  mongo: {
    endpoint: process.env.MONGO_ENDPOINT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
  },
  server: {
    separateEndpoint: process.env.SEPARATE_ENDPOINT,
    retrievalEndPoint: process.env.RETRIEVAL_ENDPOINT,
    sheetEndpoint: process.env.SHEET_ENDPOINT,
  },
  redis: {
    endpoint: process.env.PROGRESS_REDIS_ENDPOINT,
    port: process.env.PROGRESS_REDIS_PORT,
  },
  inference: {
    separateURL: process.env.SEPARATE_URL || 'localhost:1201',
    retrievalURL: process.env.RETRIEVAL_URL || 'localhost:1202',
    sheetURL: process.env.SHEET_URL || 'localhost:1203',
  },
});
