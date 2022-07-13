import * as AWS from "aws-sdk";
import { AwsConfigType } from "src/configs/aws.config";
import { ConfigService } from "@nestjs/config"

export type SQSType = Omit<typeof AWS.SQS, 'Types' | 'prototype'>;

export const SQSProvider = [{
    provide: 'SQS_INSTANCE',
    useFactory: (config: ConfigService): SQSType => {
        const {aws, sqs} = config.get<AwsConfigType>('aws');
        return new AWS.SQS({...aws, endpoint: sqs.url, apiVersion: sqs.apiVersion})
    },
    inject: [ConfigService]
}]