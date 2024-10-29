import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // Assuming the format: "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException('Token missing from header');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using your secret key
      req['user'] = decoded; // Attach decoded token (user data) to request object
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
