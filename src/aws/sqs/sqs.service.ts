import { Inject, Injectable } from "@nestjs/common";
import { SheetService } from "src/sheet/sheet.service";
import { SQSType } from "./sqs.providers";

@Injectable()
export class SQSService {
    constructor(@Inject('SQS_INSTANCE') private sqs: SQSType) {
        // set aws config
        
    }

    private async startPolling(){
        
    }

    private async stopPolling(){

    }

}