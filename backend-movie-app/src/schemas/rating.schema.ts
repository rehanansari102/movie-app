// rating.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Number, min: 1, max: 5 })
  rating: number;

  @Prop({ type: String, ref: 'User' })
  userId: string;

  @Prop({ type: String, ref: 'Movie' })
  movieId: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
