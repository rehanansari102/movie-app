import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { Movie } from 'src/schemas/movie.schema';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':userId')
  async recommend(@Param('userId') userId: string): Promise<Movie[]> {
    return this.recommendationService.recommend(userId);
  }
}