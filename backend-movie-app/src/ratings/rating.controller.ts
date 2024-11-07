// rating.controller.ts
import { Controller, Post, Body, Param, UseGuards,Request,Get } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from '../dtos/rating.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authGuard/auth.gaurd';

@ApiTags('ratings')
@Controller('ratings')
@ApiBearerAuth('JWT-auth') 
@UseGuards(AuthGuard) 
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    const id = req.user.id;
    return this.ratingService.create({...createRatingDto,userId:id});
  }
  @Get('/:movieId')
  async getUserRatingForMovie(@Request() req, @Param('movieId') movieId: string) {
    const userId = req.user.id;
    return await this.ratingService.findUserRatingForMovie(movieId, userId);
  }
}