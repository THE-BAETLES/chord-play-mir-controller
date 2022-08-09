import { connection, Connection } from 'mongoose';
import { Model } from 'mongoose';
import { SheetDataSchema } from 'src/schemas/sheetData.schema';
import { MONGO_CONNECTION } from 'src/database/mongo/mongodb.providers';
import { SheetSchema } from 'src/schemas/sheet.schema';
import { VideoSchema } from 'src/schemas/video.schema';
export const SHEET_DATA_MODEL = 'SHEET_DATA_MODEL';
export const SHEET_DATA = 'SHEET_DATA';

export const SHEET = 'SHEET';
export const SHEET_MODEL = 'SHEET_MODEL';

export const VIDEO_MODEL = 'VIDEO_MODEL';
export const VIDEO = 'VIDEO';

export const sheetDataProvider = [
  {
    provide: VIDEO_MODEL,
    useFactory: (): typeof Model => {
      return connection.model(VIDEO, VideoSchema, VIDEO);
    },
    inject: [MONGO_CONNECTION],
  },
  {
    provide: SHEET_DATA_MODEL,
    useFactory: (connection: Connection): typeof Model => {
      return connection.model(SHEET_DATA, SheetDataSchema, SHEET_DATA);
    },
    inject: [MONGO_CONNECTION],
  },
  {
    provide: SHEET_MODEL,
    useFactory: (connection: Connection): typeof Model => {
      return connection.model(SHEET, SheetSchema, SHEET);
    },
    inject: [MONGO_CONNECTION],
  },
];
