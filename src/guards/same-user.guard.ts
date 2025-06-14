import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class SameUserGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId: string = request.params?.userId || request.body?.userId;
    const tokenUserId = request.user?.id;

    if (userId !== tokenUserId) throw new ForbiddenException('You are not allowed to perform this action on this user');
    return true; // User is allowed to proceed
  }
}
