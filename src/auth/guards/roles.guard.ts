// guards/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/decorators/public.decorator';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { auth } from 'src/lib/admin';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request.headers.authorization);

    if (isPublic) {
      return true;
    }

    if (token) {
      const decodedToken = await this.validateToken(token);
      if (decodedToken && (!roles || this.verifyRoles(decodedToken, roles))) {
        request.user = decodedToken;
        return true;
      }
    }

    throw new UnauthorizedException();
  }

  extractToken(bearer: string): string {
    const matches = bearer?.match(/^Bearer\s+(.+)/);
    return matches?.[1];
  }

  async validateToken(token: string) {
    try {
      return await auth.verifyIdToken(token);
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

  verifyRoles(decodedToken: any, roles: string[]): boolean {
    const userRoles = decodedToken.roles || [];
    return roles.some((role) => userRoles.includes(role));
  }
}
