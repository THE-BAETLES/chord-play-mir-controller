import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type SheetDocument = Sheet & Document;

@Schema()
export class Sheet {
  _id: string;

  @Prop()
  video_id: string;

  @Prop()
  user_id: string;

  @Prop()
  title: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  like_count: number;
}

export const SheetSchema = SchemaFactory.createForClass(Sheet);
