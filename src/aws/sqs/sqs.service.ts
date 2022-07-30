import { Inject, Injectable } from '@nestjs/common';
import { SheetService } from 'src/sheet/sheet.service';
import { ReceiveMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';
import { SQS_CLIENT } from './sqs.providers';
import { ReceiveMessageCommand } from '@aws-sdk/client-sqs';
import { ReceiveMessageCommandInput } from '@aws-sdk/client-sqs';

@Injectable()
export class SQSService {
  constructor(@Inject(SQS_CLIENT) private client: SQSClient) {}

  async receiveMessage(): Promise<ReceiveMessageCommandOutput> {
    console.log('Hello');
    const queueUrl = (await this.client.config.endpoint()).path;

    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 5,
      VisibilityTimeout: 50,
    });

    const response: ReceiveMessageCommandOutput = await this.client.send(command);
    return response;
  }
}
