import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Sheet, SheetDocument } from 'src/schemas/sheet.schema';
import { SHEET_MODEL } from 'src/sheet/sheetdata.providers';
@Injectable()
export class SheetRepository {
  constructor(@Inject(SHEET_MODEL) private sheetModel: Model<SheetDocument>) {}

  async create(createSheetInfoDto: Sheet): Promise<SheetDocument> {
    // TODO: Handle duplication id error
    const createdSheetInfo = new this.sheetModel(createSheetInfoDto);
    return createdSheetInfo.save();
  }

  async findSheetIdByVideoId(videoId: string): Promise<SheetDocument> {
    return this.sheetModel.findOne({ 'video.$id': videoId }).exec();
  }
}
