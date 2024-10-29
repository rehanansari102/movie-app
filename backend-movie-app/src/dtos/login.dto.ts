// dtos/login.dto.ts
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  password: string;
}