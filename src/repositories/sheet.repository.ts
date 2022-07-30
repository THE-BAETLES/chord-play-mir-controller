import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SheetDocument } from 'src/schemas/sheet.schema';
import { SHEET_MODEL } from 'src/sheet/sheetdata.providers';
@Injectable()
export class SheetRepository {
  constructor(@Inject(SHEET_MODEL) private sheetModel: Model<SheetDocument>) {}

  async findSheetIdByVideoId(videoId: string): Promise<SheetDocument> {
    return this.sheetModel.findOne({ video_id: videoId }).exec();
  }
}
