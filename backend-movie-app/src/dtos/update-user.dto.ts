import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(3, 50) // Name length between 3 and 50 characters
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail() // Validate email format
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  dateOfBirth?: Date;
}