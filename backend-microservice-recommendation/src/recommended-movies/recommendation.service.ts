import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../schemas/movie.schema';
import { Rating } from 'src/schemas/rating.schema';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    @InjectModel('Rating') private readonly ratingModel: Model<Rating>,
  ) {}

  // Recommend movies for a user based on some logic
  async recommend(userId: string): Promise<Movie[]> {
    try {
      const recommendedMovies = await this.getRecommendationsByUser(userId);

      if (!recommendedMovies || recommendedMovies.length === 0) {
        throw new NotFoundException(
          `No recommendations found for user: ${userId}`,
        );
      }

      return recommendedMovies;
    } catch (error) {
      throw error; // Propagate any error
    }
  }

  private async getRecommendationsByUser(userId: string): Promise<Movie[]> {
    const userMovies = await this.ratingModel.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'movies',
          let: { movieId: '$movieId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$movieId' }] } } },
          ],
          as: 'movieDetails',
        },
      },
      { 
        $unwind: { 
          path: '$movieDetails', 
          preserveNullAndEmptyArrays: true 
        } 
      },
      {
        $project: { 
          categoryId: '$movieDetails.categoryId', 
          rating: 1 
        } 
      },
    ]);
  
    const userCategories = userMovies.map(
      (movie) => movie.movieDetails.categoryId,
    );

    if (userCategories.length === 0) {
      console.log('No categories found for user movies');
      return [];
    }

    return this.movieModel
      .aggregate([
        { $match: { categoryId: { $in: userCategories } } },
        {
          $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'movieId',
            as: 'ratings',
          },
        },
        {
          $addFields: {
            averageRating: { $avg: '$ratings.rating' },
          },
        },
        { $match: { 'ratings.userId': { $ne: userId } } },
        { $sort: { averageRating: -1 } },
        { $limit: 10 },
      ])
      .exec();
  }

  // Future expansion: Implement collaborative or content-based filtering here
  private async collaborativeFiltering(userId: string): Promise<Movie[]> {
    // Placeholder for future logic
    return [];
  }

  private async contentBasedFiltering(userId: string): Promise<Movie[]> {
    // Placeholder for future logic
    return [];
  }
}
