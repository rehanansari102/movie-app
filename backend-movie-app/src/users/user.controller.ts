import { Controller, Post, Body, Request,Get, Param, Patch, HttpCode, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dtos/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { AuthGuard } from 'src/authGuard/auth.gaurd';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('JWT-auth') 
@UseGuards(AuthGuard) 
export class UserController {
  constructor(private readonly userService: UserService) {}

 

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.userService.findAll();
    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get('me') // Optional: you can use a specific route like 'me' to get the logged-in user
  @HttpCode(HttpStatus.OK)
  async findOne(@Request() req) {
    const userId = req.user.id; // Get user ID from the JWT payload

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: 'User updated successfully',
      data: user,
    };
  }
}
