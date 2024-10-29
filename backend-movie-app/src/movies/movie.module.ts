// movies.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { SearchService } from './search.service';
import { MovieSchema } from '../schemas/movie.schema';

const mongooseConfig = {
  name: 'Movie',
  schema: MovieSchema,
};


@Module({
  imports: [
    MongooseModule.forFeature([mongooseConfig]),
    HttpModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, SearchService],
})
export class MoviesModule {}