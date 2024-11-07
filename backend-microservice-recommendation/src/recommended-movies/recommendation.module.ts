// recommended-movies/recommendation.module.ts
import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from '../schemas/movie.schema';
import { RatingSchema} from '../schemas/rating.schema';
const mongooseConfig = {
  name: 'Movie',
  schema: MovieSchema,
};
const Rating = {
  name: 'Rating',
  schema: RatingSchema,
};

@Module({
  imports: [
    MongooseModule.forFeature([mongooseConfig,Rating]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}