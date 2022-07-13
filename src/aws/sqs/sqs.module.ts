import { Module } from "@nestjs/common";
import { SheetService } from "src/sheet/sheet.service";
import { SQSProvider } from "./sqs.providers";
import { SQSService } from "./sqs.service";
import { SheetModule } from "src/sheet/sheet.module";
@Module({
    providers: [...SQSProvider, SQSService],
})
export class SQSModule {}