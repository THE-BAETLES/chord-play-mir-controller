import { Injectable } from "@nestjs/common";
import { Sheet } from "src/entities/sheet.entities";
import { S3Client} from "@aws-sdk/client-s3";

@Injectable()
export class AwsUploadService{
    private constructor(){
        
    }

    async upload(payload: Sheet) {

    }
}