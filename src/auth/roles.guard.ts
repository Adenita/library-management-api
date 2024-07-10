import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../modules/user/entity/role.enum';

export const Roles = Reflector.createDecorator<RoleType[]>();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: RoleType[] = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(roles: RoleType[], userRoles: RoleType[]) {
    return roles.some((role: RoleType) => userRoles.includes(role));
  }
}
