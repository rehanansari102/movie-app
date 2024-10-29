// category.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { AuthGuard } from 'src/authGuard/auth.gaurd';

@ApiTags('categories')
@Controller('categories')
@ApiBearerAuth('JWT-auth') 
@UseGuards(AuthGuard) 
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createUserDto: CreateCategoryDto) {
    return this.categoryService.create(createUserDto);
  }
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}