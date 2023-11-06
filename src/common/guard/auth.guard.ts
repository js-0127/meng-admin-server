import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/services/prisma.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma:PrismaService
    ) { }
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler())
    if (!roles) {
      return true
    }
    //获取http请求对象
    const request = context.switchToHttp().getRequest();
    const user = request.body;
    const userRoleIds = user.user_role
    let roleEntity: any[] = [];
    this.prisma.role.findMany({
        where: {
            id: {
                in: userRoleIds
            }
        }
    }).then(res => {
        roleEntity = res
    })
    const roleNames = roleEntity.map(item => item.name)
    return matchRoles(roles, roleNames);
  }
}

function matchRoles(roles: string[], roles1: string[]): boolean | Promise<boolean> | Observable<boolean> {
  return roles1.includes(roles[0])
}

