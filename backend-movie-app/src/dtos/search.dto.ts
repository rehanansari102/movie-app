import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ required: true })
  query: string;
}