import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'src/models/jwt';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  
  constructor(
    private jwtService: JwtService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded: JwtPayload = this.jwtService.decode(token);
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name
      };
    }
    next();
  }
}
