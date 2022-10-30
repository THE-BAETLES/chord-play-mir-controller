import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
export type VideoDocument = Video & Document;

@Schema()
export class Video {
  // Object ID?
  @Prop({ type: String, required: true })
  _id: string;

  thumbnail_path?: string;

  title?: string;

  @Prop()
  genre?: string;

  @Prop()
  singer?: string;

  @Prop()
  tags?: string[];

  @Prop()
  length?: number;

  @Prop()
  difficulty_avg?: number;

  @Prop()
  play_count?: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
