import { Inject, Injectable } from '@nestjs/common';
import {Request} from 'express'
import {hash, verify} from 'argon2'
import { RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import * as svgCaptcha from 'svg-captcha';
import { RsaService } from 'src/services/rsa.service';
import { PrismaService } from 'src/services/prisma.service';
import { EmailService } from 'src/services/mail.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { CaptchaType, LoginDto } from './dto/login.dto';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { TokenVO } from './dto/token.dto';
import { SocketMessageType } from 'src/socket/interface/message';
import {R} from '../../utils/common/error'
import {generateRandomCode} from '../../utils/common/uuid'
import { uuid } from 'src/utils/common/uuid';
import { getAdressByIp, getIp, getUserAgent } from 'src/utils/common/ip';

@Injectable() 
export class AuthService {
  private chekcCapctha:CaptchaType
   //保存验证码
  constructor(
    private readonly prisma:PrismaService,
    private readonly config: ConfigService,
   @Inject('DEFAULT') private readonly redisClient: RedisClientType,
   private readonly EmailService: EmailService,
   private readonly RsaService: RsaService,
   private readonly socketGateway: SocketGateway
    ) {}
  /**
   * @description 返回验证码
   * @date 09/25/2023
   * @returns {*} captcha
   * @memberof AuthService
   */
  public async genCaptcha():Promise<CaptchaType> {
      //持续创建
      const c = svgCaptcha.createMathExpr({
        width: 100,
        height: 38,
        color: true,
        mathMin: 1,
        mathMax: 9,
        mathOperator: '+'
      });
      this.chekcCapctha = Object.assign(c, { id: uuid(), time: new Date()});
      return this.chekcCapctha
    }
  /**
   * @description 登录返回token
   * @date 09/25/2023
   * @returns {*} token,refreshtoken
   * @memberof AuthService
   */
  public async login(loginDto: LoginDto, req:Request): Promise<TokenVO> {
    const ip = getIp(req)
    const address = getAdressByIp(ip)
    const browser = getUserAgent(req).family
    const os = getUserAgent(req).os.toString()
    const accountNumber = loginDto.accountNumber

    try {
      //验证是否有这个用户
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { userName: accountNumber },
          { email: accountNumber },
          { phoneNumber: accountNumber}
        ]
      }
    })
    
    if(!user) {
      console.log(user);
      throw R.error('用户名错误')
    }
    //获取私钥并且,把密码解密
   const password =  await this.RsaService.decrypt(loginDto.publicKey, loginDto.password)
   //删除私钥
   await this.redisClient.del(`publicKey:${loginDto.publicKey}`)
   
    if(!password) {
      throw R.error('登陆出现异常,请重新登录');
    }
    loginDto.password = password

    if(!await verify(user.password, loginDto.password)) {
      throw R.error('密码错误')
    }
    if(loginDto.captcha !== this.chekcCapctha.text) {
      throw R.error('验证码错误')
    }
    
    const status = true
    const message = '成功'

    await this.prisma.login_Log.create({
      data: {
        ip,
        address,
        browser,
        os,
        userName:accountNumber,
        status,
        message
      }
    })

    const expire:number = this.config.get('token').expire
    const refreshExpire:number = this.config.get('token').refreshExpire
    const token = uuid()
    const refreshToken = uuid()

    await this.redisClient
    .multi()
    .set(`token:${token}`, JSON.stringify({userId: user.id, refreshToken}))
    .expire(`token:${token}`, expire)
    .set(`refreshToken:${refreshToken}`, user.id)
    .expire(`refreshToken:${refreshToken}`, refreshExpire)
    .sAdd(`userToken_${user.id}`, token)
    .sAdd(`userRefreshToken_${user.id}`, refreshToken)
    .exec()
    return {
      expire,
      token,
      refreshExpire,
      refreshToken,
    } as TokenVO;

    } catch (error){
        const status = false
        const message = error?.response || '登录失败'
        await this.prisma.login_Log.create({
          data: {
             ip,
             os,
             address,
             browser,
             userName:accountNumber,
             status,
             message
          }
        })
        throw R.error(message)
    }
} 

  
   /**
    * @description 拿到freshToken去获取新的token,refreshToken
    * @date — 09/26/2023
    * @returns token,refreshToken
    */
   public async refreshToken(dto: RefreshTokenDTO): Promise<TokenVO>{
          const userId = await this.redisClient.get(
            `refreshToken:${dto.refreshToken}`
          );
          if(!userId){
            throw R.error('刷新token失败')
          }
          const expire:number = this.config.get('token').expire
          const token = uuid()

          await this.redisClient
                 .multi()
                 .set(`token:${token}`, JSON.stringify({userId: userId, refreshToken:dto.refreshToken}))
                 .expire(`token:${token}`, expire)
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
        /**
         * @description 退出登录
         * @date 09/27/2023
         */
        async logout(req:Request){
          const res = await this.redisClient
            .multi()
            .del(`token:${req['token']}`)
            .del(`refreshToken:${req['userInfo'].refreshToken}`)
            .exec()
            if(res.some(item => item[0])){
              throw R.error('退出登录失败')
            }
            return true
        }

        //修改密码时发送邮箱验证码
        /**
         * @description 用于修改密码发送邮箱验证码
         * @date 10/02/2023
         */
        async sendResetPasswordEmail(emailInfo:{email:string}){
               if(!emailInfo.email) {
                throw R.error('邮箱不能为空')
               }

               const user  = await this.prisma.user.findUnique({
                where: {
                  email: emailInfo.email
                }
               })
               if(!user) {
                throw R.error('不存在当前邮箱')
               }
            
               const emailCaptcha = generateRandomCode()
               const mailCaptchaExpire = this.config.get('mailCaptchaExpire').expire
               await this.redisClient
               .multi()
               .set(`resetPasswordEmailCaptcha:${emailCaptcha}`, emailCaptcha)
               .expire(`resetPasswordEmailCaptcha:${emailCaptcha}`, mailCaptchaExpire)
               .exec()
                 

               const resetPasswordUrl = `http://121.40.254.241/reset-password?email=${emailInfo.email}&emailCaptcha=${emailCaptcha}`;

               await this.EmailService.sendEmail({
                to: emailInfo.email,
                html: `<div style="padding: 28px 0; color: #888;">
                <h1 style="color: #888;">
                  <span style="color:#5867dd; margin:0 1px;"><a>${emailInfo.email}</a></span>, 你好！
                </h1>
                <p>请先确认本邮件是否是你需要的。</p>
                <p>请点击下面的地址，根据提示进行密码重置：</p>
                <a href="${resetPasswordUrl}" target="_blank" style="text-decoration: none;
                display: inline-block;
                padding: 8px 25px;
                background: #5867dd;
                cursor: pointer;
                color: #fff;
                border-radius: 5px;" rel="noopener">点击跳转到密码重置页面</a>
                <p>如果单击上面按钮没有反应，请复制下面链接到浏览器窗口中，或直接输入链接。</p>
                <p>
                  ${resetPasswordUrl}
                </p>
                <p>如您未提交该申请，请不要理会此邮件，对此为您带来的不便深表歉意。</p>
                <p>本次链接30分钟后失效</p>
                <div style="text-align: right;margin-top: 50px;">
                  <span>meng-admin</span>
                </div>
              </div>`,
                subject: 'meng-admin平台密码重置提醒',
              });
        }

        /**
         * @description 重置密码
         * @date 10/04/2023
         */
        async resetPassword(resetPasswordDto: ResetPasswordDto){
           const captcha = await this.redisClient.get(`resetPasswordEmailCaptcha:${resetPasswordDto.emailCaptcha}`)
           if(captcha !== resetPasswordDto.emailCaptcha){
            throw R.error('邮箱验证码错误或已失效')
           }

           const user = await this.prisma.user.findUnique({
            where: {
              email: resetPasswordDto.email
            }
           })

           if(!user) throw R.error('邮箱不存在')
           
           const password = await this.RsaService.decrypt(resetPasswordDto.publicKey, resetPasswordDto.password)
           
           const token = await this.redisClient.sMembers(`userToken_${user.id}`)
           const refreshToken = await this.redisClient.sMembers(`userRefreshToken_${user.id}`)

           await this.prisma.$transaction(async(prisma) => {
              const hashPassword = await hash(password)
              await prisma.user.updateMany({
                where: {
                  email: resetPasswordDto.email
                },
                data: {
                    password: hashPassword
                }
              })

              await Promise.all([
                ...token.map((token) => this.redisClient.del(`token:${token}`)),
                ...refreshToken.map((refreshToken) => this.redisClient.del(`refreshToken:${refreshToken}`)),
                this.redisClient.del(`resetPasswordEmailCapthca:${resetPasswordDto.email}`)
              ])
             
            this.socketGateway.sendMessage(user.id, {
              type: SocketMessageType.PasswordChange
            })
           
           })
        }
}
