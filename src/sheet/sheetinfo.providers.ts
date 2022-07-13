import { Connection } from "mongoose";
import { SheetInfoSchema } from "src/schemas/sheetinfo.schema";
import { Model } from "mongoose";
export const sheetInfoProvider =[{
    provide: 'SHEETINFO_MODEL',
    useFactory: (connection: Connection): typeof Model => {
        return connection.model('SHEET_INFO', SheetInfoSchema)
    },
    inject: ['MONGO_CONNECTION']
}]