import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { MoviesModule } from './movies/movie.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/category.module';
import { RatingsModule } from './ratings/rating.module';
import databaseConfig from './config/config'; // Import your database configuration file if you created one
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './authGuard/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig], // Load your database config
      isGlobal: true, // Make it global so it can be accessed everywhere
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    CategoriesModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
