// dtos/create-movie.dto.ts
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ required: true })
  categoryId: string;
}