import { Inject, Injectable } from '@nestjs/common';
import { CreateSheetInfoDto } from 'src/dto/CreateSheetInfo.dto';
import { Model } from 'mongoose';
import { SheetDataDocument } from 'src/schemas/sheetData.schema';
import { SHEET_DATA_MODEL } from 'src/sheet/sheetdata.providers';
@Injectable()
export class SheetDataRepository {
  constructor(
    @Inject(SHEET_DATA_MODEL)
    private sheetInfoModel: Model<SheetDataDocument>,
  ) {}

  async create(createSheetInfoDto: CreateSheetInfoDto): Promise<SheetDataDocument> {
    // TODO: Handle duplication id error
    const createdSheetInfo = new this.sheetInfoModel(createSheetInfoDto);
    return createdSheetInfo.save();
  }

  async findAll(): Promise<SheetDataDocument[]> {
    return this.sheetInfoModel.find().exec();
  }
}
