import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // if (!roles) {
        //   return true;
        // }
        // const request = context.switchToHttp().getRequest();
        // const user = request.user;
        // return matchRoles(roles, user.roles);
        const authorized = this.reflector.get<boolean>('authorized', context.getHandler());
        if (authorized === false) {
        return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user ? true : false;
    }
    }