// movie.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, ref: 'Category' })
  categoryId: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
