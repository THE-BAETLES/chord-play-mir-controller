import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { ChordInfo } from 'src/models/chordinfo.model';
export type SheetDataDocument = SheetData & Document;

@Schema()
export class SheetData {
  _id: ObjectId;

  @Prop({ type: Number })
  bpm: number;

  @Prop({ type: [Number] })
  beat_infos: number[];

  @Prop()
  chord_infos: ChordInfo[];
}

export const SheetDataSchema = SchemaFactory.createForClass(SheetData);
