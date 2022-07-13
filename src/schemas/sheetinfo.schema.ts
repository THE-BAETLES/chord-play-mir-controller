import { Schema } from "mongoose";
import { ChordInfoSchema } from "../schemas/chordinfo.schema";
export const SheetInfoSchema = new Schema({
    _id: String,
    chord_info: [ChordInfoSchema]
});
