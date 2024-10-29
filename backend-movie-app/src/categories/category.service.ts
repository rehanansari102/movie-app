// category.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from 'src/dtos/category.dto';
@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async create(category : CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryModel.create(category);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}