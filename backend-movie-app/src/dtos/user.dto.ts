// dtos/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UserDto {
  
  @ApiProperty({ required: true, description: 'User name must be between 3 and 50 characters' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)  // Name length between 3 and 50 characters
  name: string;

  @ApiProperty({ required: true, description: 'User password must be between 6 and 50 characters' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 50)  // Password length between 6 and 50 characters
  password: string;

  @ApiProperty({ required: true, description: 'A valid email address' })
  @IsNotEmpty()
  @IsEmail()  // Validate email format
  email: string;

  @ApiProperty({ required: false, description: 'Optional image URL for the user' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false, description: 'Optional date of birth' })
  @IsOptional()
  dateOfBirth?: Date;
}
