import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/services/prisma.service';
import { RedisClientType } from 'redis';

@Injectable()
export class AuthGuard implements CanActivate {
  private result:boolean | Promise<boolean> | Observable<boolean> 
  constructor(
    private reflector: Reflector,
    private readonly prisma:PrismaService,
    @Inject('DEFAULT') private readonly redisClient: RedisClientType,
    ) { }
    async canActivate(context: ExecutionContext,): Promise<boolean> {
    const roles = this.reflector.get<string[]>('userName', context.getHandler())
    if (!roles) {
      return true
    }
    //获取http请求对象
    const req = context.switchToHttp().getRequest<Request>()
    const token = req.headers['authorization']?.replace('Bearer ', '')
    try {
      const res = await this.redisClient.get(`token:${token}`);
      const userInfo = JSON.parse(res);
      const user = await this.prisma.user.findUnique({ where: { id: userInfo.userId } });
      this.result = matchRoles(roles, user.userName);
      return this.result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

function matchRoles(roles: string[], roles1: string): Promise<boolean> | boolean  {
  return roles.includes(roles1)
}

