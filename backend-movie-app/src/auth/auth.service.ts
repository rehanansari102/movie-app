import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dtos/user.dto';

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
  async register(userDto: UserDto) {
    let user = await this.userService.create(userDto);

    // Generate a token for the newly created user
    const payload = { email: user.email, id: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken }; // Return both the user and the access token
  }
}
