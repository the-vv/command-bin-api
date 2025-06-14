import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'src/models/jwt';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {

  constructor(
    private jwtService: JwtService
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      let decoded: JwtPayload | null = null;
      try {
        decoded = this.jwtService.verify(token) satisfies JwtPayload;
      } catch (e) {
        throw new UnauthorizedException(e instanceof Error ? e.message : 'Invalid token');
      }
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name
      };
    }
    next();
  }
}
