import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { ChordInfo } from 'src/models/chordinfo.model';

export type SheetDataDocument = SheetData & Document;

@Schema()
export class SheetData {
  @Prop({ type: 'ObjectId', required: true })
  _id: ObjectId;

  @Prop({ type: Number })
  bpm: number;

  @Prop()
  chord_infos: ChordInfo[];
}

export const SheetDataSchema = SchemaFactory.createForClass(SheetData);
