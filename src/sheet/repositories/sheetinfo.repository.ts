import { Inject, Injectable } from "@nestjs/common";
import { Connection } from "mongoose";
import { CreateSheetInfoDto } from "src/dto/CreateSheetInfo.dto";
import {SheetInfo} from "src/models/sheetinfo.model";
import { Model } from "mongoose";

@Injectable()
export class SheetInfoRepository {
    @Inject('MONGO_CONNECTION')
    private sheetInfoModel: Model<SheetInfo>

    async create(createSheetInfoDto: CreateSheetInfoDto): Promise<SheetInfo> {
        const createdSheetInfo = new this.sheetInfoModel(createSheetInfoDto)
        return createdSheetInfo.save()
    }

    async findAll(): Promise<SheetInfo[]> {
        return this.sheetInfoModel.find().exec();
    }

}