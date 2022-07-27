import { Inject, Injectable } from "@nestjs/common";
import { SheetService } from "src/sheet/sheet.service";
import { SQSClient } from "@aws-sdk/client-sqs";


@Injectable()
export class SQSService {
    constructor(@Inject('SQS_INSTANCE') private sqs: SQSClient) {
        // set aws config
        
    }

    private async startPolling(){
        
    }

    private async stopPolling(){

    }

}