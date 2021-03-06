import { Inject, Injectable, Logger } from '@nestjs/common';
import { DeleteMessageCommand, ReceiveMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';
import { SQS_CLIENT } from './sqs.providers';
import { ReceiveMessageCommand } from '@aws-sdk/client-sqs';
import { DeleteMessageCommandOutput } from '@aws-sdk/client-sqs';

@Injectable()
export class SQSService {
  private queueUrl;
  constructor(@Inject(SQS_CLIENT) private client: SQSClient) {
    async () => {
      this.queueUrl = await (await this.client.config.endpoint()).port;
    };
  }

  async receiveMessage(): Promise<ReceiveMessageCommandOutput> {
    Logger.log('Receive Message Start!!');
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 5,
      VisibilityTimeout: 50,
    });

    const response: ReceiveMessageCommandOutput = await this.client.send(command);
    Logger.log('Receive Message End!!');
    return response;
  }

  async deleteMessage(receiptHandle: string): Promise<DeleteMessageCommandOutput> {
    Logger.log(`Delete Message Start!! receiptHandleId: ${receiptHandle}`);
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    const response: DeleteMessageCommandOutput = await this.client.send(command);
    Logger.log(`Delete Message Start!! receiptHandleId: ${receiptHandle}`);
    return response;
  }
}
