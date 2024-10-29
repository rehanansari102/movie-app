import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationModule } from './recommended-movies/recommendation.module';
import { DatabaseModule } from 'database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/config';
@Module({
  imports: [ConfigModule.forRoot({
    load: [databaseConfig], // Load your database config
    isGlobal: true, // Make it global so it can be accessed everywhere
  }),RecommendationModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
