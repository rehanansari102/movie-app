import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../schemas/movie.schema';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  // Recommend movies for a user based on some logic
  async recommend(userId: string): Promise<Movie[]> {
    try {
      const recommendedMovies = await this.getRecommendationsByUser(userId);

      if (!recommendedMovies || recommendedMovies.length === 0) {
        throw new NotFoundException(`No recommendations found for user: ${userId}`);
      }

      return recommendedMovies;
    } catch (error) {
      throw error; // Propagate any error
    }
  }

  // Modular method for getting user-based recommendations
  private async getRecommendationsByUser(userId: string): Promise<Movie[]> {
    // Example recommendation logic: Return 5 random movies for this user
    return this.movieModel.aggregate([
      { $match: { userId } },         // Filter movies by user ID
      { $sample: { size: 10 } },       // Randomly sample 5 movies
    ]).exec();
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
