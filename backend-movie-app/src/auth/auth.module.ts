import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/user.module';
import { JwtStrategy } from 'src/authGuard/jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from 'src/authGuard/auth.gaurd';

@Module({
  imports: [
    ConfigModule, // Import for environment variables
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "secretkey@#12", // JWT secret
        signOptions: { expiresIn: '3600s' }, // Token expiration
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard], // Ensure AuthGuard is listed here
  exports: [AuthGuard], // Export AuthGuard for other modules
})
export class AuthModule {}
