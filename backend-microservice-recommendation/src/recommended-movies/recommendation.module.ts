// recommended-movies/recommendation.module.ts
import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from '../schemas/movie.schema';

const mongooseConfig = {
  name: 'Movie',
  schema: MovieSchema,
};

@Module({
  imports: [
    MongooseModule.forFeature([mongooseConfig]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}