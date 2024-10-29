import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SearchDto } from '../dtos/search.dto';
import { Movie } from 'src/schemas/movie.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async search(query: string): Promise<Movie[]> {
    return this.movieModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search on title
        { description: { $regex: query, $options: 'i' } } // Case-insensitive search on description
      ]
    }).exec();
  }
}