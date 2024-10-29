// dtos/create-rating.dto.ts
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ required: true, type: Number, minimum: 1, maximum: 5 })
  @Prop({ required: true })
  rating: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  movieId: string;
}