import { Inject, Injectable } from '@nestjs/common';
import { CreateSheetInfoDto } from 'src/dto/CreateSheetInfo.dto';
import { Model } from 'mongoose';
import { SheetData, SheetDataDocument } from 'src/schemas/sheetData.schema';
import { SHEET_DATA_MODEL } from 'src/sheet/sheetdata.providers';
@Injectable()
export class SheetDataRepository {
  constructor(
    @Inject(SHEET_DATA_MODEL)
    private sheetInfoModel: Model<SheetDataDocument>,
  ) {}

  async create(createSheetInfoDto: SheetData): Promise<SheetDataDocument> {
    // TODO: Handle duplication id error
    const createdSheetInfo = new this.sheetInfoModel(createSheetInfoDto);
    return createdSheetInfo.save();
  }

  async isExist(id: string): Promise<boolean> {
    const sheetId = this.sheetInfoModel.find({ _id: id });
    return (await sheetId).length !== 0;
  }

  async findAll(): Promise<SheetDataDocument[]> {
    return this.sheetInfoModel.find().exec();
  }
}
