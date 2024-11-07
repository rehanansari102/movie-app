// rating.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Rating } from '../schemas/rating.schema';
import { CreateRatingDto } from '../dtos/rating.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RatingService {
  constructor(@InjectModel('Rating') private readonly ratingModel: Model<Rating>) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    // Check if a rating already exists for the given movie and user
    const existingRating = await this.ratingModel.findOne({
      movieId: createRatingDto.movieId,
      userId: createRatingDto?.userId,
    });

    if (existingRating) {
      // If rating exists, update it
      existingRating.rating = createRatingDto.rating;
      return existingRating.save();
    } else {
      // If no rating exists, create a new one
      const newRating = new this.ratingModel(createRatingDto);
      return newRating.save();
    }
  }
  async findUserRatingForMovie(movieId: string, userId: string) {
    return await this.ratingModel.findOne({ movieId, userId }).exec();
  }
}