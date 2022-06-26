import { Injectable } from "@nestjs/common";
import { IAwsUploadService } from "./aws.interface.upload.service";
import { Sheet } from "src/entities/sheet.entities";
import { S3Client} from "@aws-sdk/client-s3";

@Injectable()
export class AwsUploadService implements IAwsUploadService<Sheet> {
    private constructor(){
        
    }

    upload(payload: Sheet) {

    }
}