import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dtos/user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email); // Use findByEmail instead

    if (!user) {
      throw new NotFoundException('User not found'); // Change to NotFoundException for a 404 response
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Invalid credentials'); // Throw ForbiddenException for a 403 response
    }

    const payload = { email: user.email, id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async register(userDto: UserDto): Promise<{ user: User; accessToken: string }> {
    try {
      // Check if the user already exists based on email or other unique identifier
      const existingUser = await this.userService.findByEmail(userDto.email);
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }
  
      // Create the new user if no existing user is found
      const user = await this.userService.create(userDto);
  
      // Generate a token for the newly created user
      const payload = { email: user.email, id: user._id };
      const accessToken = this.jwtService.sign(payload);
  
      // Return both the user and the access token
      return { user, accessToken };
    } catch (error) {
      if (error instanceof BadRequestException) {
        // If it's a known error, rethrow it to be handled as a 400 response
        throw error;
      }
  
      // Log other unexpected errors and throw an internal server error
      console.error('Error in user registration:', error);
      throw new InternalServerErrorException('User registration failed');
    }
  }
  
}
