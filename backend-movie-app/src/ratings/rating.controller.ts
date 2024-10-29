// rating.controller.ts
import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
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
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }
}