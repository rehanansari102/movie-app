// movie.controller.ts
import { Controller, Get, Post, Body, Param,Request, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '../dtos/movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/authGuard/auth.gaurd';

@ApiTags('movies')
@Controller('movies')
@ApiBearerAuth('JWT-auth') 
@UseGuards(AuthGuard) 
export class MovieController {
  constructor(private readonly movieService: MovieService, private readonly searchService: SearchService,) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @Request() req) {
    const userId = req.user._id;
    return this.movieService.create(createMovieDto,userId);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }
  @Get('category/:categoryId')
  async getMoviesByCategory(@Param('categoryId') categoryId: string) {
    return this.movieService.getMoviesByCategory(categoryId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.searchService.search(query);
  }

  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: string): Promise<any[]> {
    return this.movieService.getRecommendations(userId);
  }
}