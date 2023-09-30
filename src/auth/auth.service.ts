import { Body, Inject, Injectable, Post, Req } from '@nestjs/common';
import { CaptchaType, LoginDto } from './dto/login.dto';
import * as svgCaptcha from 'svg-captcha';
import { PrismaService } from 'src/prisma/prisma.service';
import {R} from '../utils/common/error'
import {verify} from 'argon2'
import * as NodeRSA from 'node-rsa'
import { TokenVO } from './dto/token.dto';
import { uuid } from 'src/utils/common/uuid';
import { RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import {Request} from 'express'
@Injectable() 
export class AuthService {
  
   //保存验证码
  private captchas: Map<string, CaptchaType> = new Map();
  public validaeCaptcha: CaptchaType;
  
  constructor(
    private readonly prisma:PrismaService,
    private readonly config: ConfigService,
   @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType
    ) {}
  /**
   * @description 返回验证码
   * @date 09/025/2023
   * @returns {*} captcha
   * @memberof AuthService
   */
  public genCaptcha(): CaptchaType {
    //是否生成了相同的验证码
    let getDiffCapctha = false;
    let c: svgCaptcha.CaptchaObj;
    //直到生成captchas中没有的验证码
    while (!getDiffCapctha) {
      //持续创建
      c = svgCaptcha.createMathExpr({
        width: 100,
        height: 38,
        color: true,
        mathMin: 1,
        mathMax: 9,
        mathOperator: '+'
      });
      if (!this.captchas.has(c.text)) {
        const captcha = Object.assign(c, {
          id: String(Math.random()),
          time: new Date(),
        });
        getDiffCapctha = true;
        this.captchas.set(c.text, captcha);
      }
    }
    this.validaeCaptcha = this.captchas.get(c.text);

    return this.captchas.get(c.text)
  }

  /**
   * @description 登录返回token
   * @date 09/25/2023
   * @returns {*} token,refreshtoken
   * @memberof AuthService
   */
  public async login(loginDto: LoginDto): Promise<TokenVO> {
    //验证是否有这个用户
    const user  = await this.prisma.user.findUnique({
      where: {
        userName: loginDto.accountNumber
      }
    })
    if(!user) {
      throw R.error('用户名错误')
    }

    //获取私钥
    const privateKey = await this.redisClient.get(
      `publicKey:${loginDto.publicKey}`
    );
    
    //删除私钥
    await this.redisClient.del(`publicKey:${loginDto.publicKey}`)

    if(!privateKey) {
      throw R.error('解密私钥错误或已失效')
    }
    //把密码解密
    const decrypt = new NodeRSA(privateKey)
    decrypt.setOptions({encryptionScheme: 'pkcs1'});
    const password = decrypt.decrypt(loginDto.password, 'utf8');
    if(!password) {
      throw R.error('登陆出现异常,请重新登录');
    }
    loginDto.password = password

    if(!await verify(user.password, loginDto.password)) {
      throw R.error('密码错误')
    }

    if(loginDto.captcha !== this.validaeCaptcha.text) {
      throw R.error('验证码错误')
    }
    
    const expire = this.config.get<number>('EXPIRE')
    const refreshExpire = this.config.get<number>('REFRESHEXPIRE')

    const token = uuid()
    const refreshToken = uuid()

    await this.redisClient
    .multi()
    .set(`token:${token}`, JSON.stringify({userId: user.id, refreshToken}))
    .expire(`token:${token}`, expire)
    .set(`refreshToken:${refreshToken}`, user.id)
    .expire(`refreshToken:${refreshToken}`, refreshExpire)
    .exec()
    return {
      expire,
      token,
      refreshExpire,
      refreshToken,
    } as TokenVO;
} 
    

 //获取公钥
  public async getPublicKey(): Promise<string>{
         const key = new NodeRSA({b: 512});
         const publicKey = key.exportKey('public')
         const privateKey = key.exportKey('private')
         await this.redisClient.set(`publicKey:${publicKey}`, privateKey);
         return publicKey
   }


   //刷新token
   public async refreshToken(dto: RefreshTokenDTO): Promise<TokenVO>{
          const userId = await this.redisClient.get(
            `refreshToken${dto.refreshToken}`
          );
          if(!userId){
            throw R.error('刷新token失败')
          }
          const expire = this.config.get<number>('EXPIRE')
          const token = uuid()

          await this.redisClient
                 .multi()
                 .set(`token:${token}`, userId)
                 .expire(`token${token}`, expire)
                 .exec()

          const refreshExpire = await this.redisClient.ttl(
            `refreshToken:${dto.refreshToken}`
          )
          return {
            expire,
            token,
            refreshExpire,
            refreshToken: dto.refreshToken
          } as TokenVO
        }

        //退出登录
        async logout(req:Request){
          const res = await this.redisClient
            .multi()
            .del(`token${req['token']}`)
            .del(`refreshToken${req['userInfo'].refreshToken}`)
            .exec()
            
            
            if(res.some(item => item[0])){
              throw R.error('退出登录失败')
            }
            return true
        }
}
