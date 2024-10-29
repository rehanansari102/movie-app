import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../users/user.service'; // Ensure this is correct
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secretkey@#12", // Ensure this is fetching the correct secret
    });
  }

  async validate(payload: any) {
    console.log(payload)
    const user = await this.userService.findByEmail(payload.email); // or any method to find user
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // This will attach the user to the request
  }
}
