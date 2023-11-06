import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RedisClientType } from 'redis';
import { Observable } from 'rxjs';
import { R } from 'src/utils/common/error';
import { getIp } from 'src/utils/common/ip';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    @Inject('DEFAULT') private readonly redisClient: RedisClientType,
     private readonly reflector: Reflector
  ){}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    
    const req = context.switchToHttp().getRequest<Request>()

    const isNotLogin = this.reflector.get<string[]>('not-login', context.getHandler())

    if(isNotLogin){
      return next.handle()
    }
   
    const token = req.headers['authorization']?.replace('Bearer ', '')
    if(!token) {
      throw R.unauthorizedError('未授权')
    } 

    const userInfoStr = await this.redisClient.get(`token:${token}`)

    
    if(!userInfoStr) {
      throw R.unauthorizedError('未授权')
    }

    const userInfo = JSON.parse(userInfoStr)
    req['userInfo'] = userInfo
    req['token'] = token 
    
    return next.handle();
  }
}
