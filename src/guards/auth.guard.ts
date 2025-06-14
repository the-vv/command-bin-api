import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class Auth implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest<Request>().user;
    if (!user) { // this is set by the JwtDecodeMiddleware
      return false; // User is not authenticated
    }
    return true; // User is authenticated
  }
}
