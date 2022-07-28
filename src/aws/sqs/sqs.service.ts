import { Inject, Injectable } from "@nestjs/common";
import { SheetService } from "src/sheet/sheet.service";
import { SQSClient } from "@aws-sdk/client-sqs";
import { SQS_CLIENT } from "./sqs.providers";

@Injectable()
export class SQSService {
    constructor(@Inject(SQS_CLIENT) private sqs: SQSClient) {
    }

    private async startPolling(){
        
    }

    private async stopPolling(){

    }

}