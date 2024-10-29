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
    return this.ratingModel.create(createRatingDto);
  }
}