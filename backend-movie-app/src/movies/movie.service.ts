// movie.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from '../schemas/movie.schema';
import { CreateMovieDto } from '../dtos/movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'; // Import lastValueFrom

import { ConfigService, ConfigModule } from '@nestjs/config';
@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    private readonly httpService: HttpService,
    private readonly configService : ConfigService
  ) {}

  async create(createMovieDto: CreateMovieDto,userId : string): Promise<Movie> {
    try {
      console.log(userId);
      const newMovie = { ...createMovieDto, userId };  // Add userId to the movie data
      return await this.movieModel.create(newMovie);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(limit: number = 10, offset: number = 0): Promise<Movie[]> {
    return await this.movieModel
      .find()
      .limit(limit)
      .skip(offset)
      .exec();
  }

  async getMoviesByCategory(categoryId: string, limit: number = 10, offset: number = 0): Promise<Movie[]> {
    return await this.movieModel
      .find({ categoryId })
      .limit(limit)
      .skip(offset)
      .exec();
  }

  async findOne(id: string): Promise<Movie> {
    return await this.movieModel.findById(id).exec();
  }

  async getRecommendations(userId: string): Promise<Movie[]> {
    try {
      const response = await lastValueFrom(this.httpService.get(`${this.configService.get<string>('base_url')}/recommendations/${userId}`));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
 
}