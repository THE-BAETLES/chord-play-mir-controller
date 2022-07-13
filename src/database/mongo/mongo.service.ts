import { Injectable } from "@nestjs/common";
import {CreateSheetInfoDto} from "src/dto/CreateSheetInfo.dto";
import { SheetInfo } from "src/models/sheetinfo.model";
import { SheetInfoRepository } from "src/sheet/repositories/sheetinfo.repository";
@Injectable()
export class MongoService {
    constructor(private sheetRepository: SheetInfoRepository) {}

    async createSheet(createSheetInfoDto: CreateSheetInfoDto): Promise<SheetInfo> {
        return await this.sheetRepository.create(createSheetInfoDto)
    }
}