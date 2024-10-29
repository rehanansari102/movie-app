// dtos/create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  name: string;
}