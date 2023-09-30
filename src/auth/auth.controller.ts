import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {  CaptchaEntity } from './entities/captcha.entity';
import { ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';
import { UserVo } from 'src/user/vo/user.vo';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { omit } from 'lodash';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UserService
    ) {}
  

  @Post('login')
  @NotLogin()
  @ApiOperation({
    summary: '登录',
  })
  async login(@Body() loginDto:LoginDto){
     return this.authService.login(loginDto)
  }
  
  @Get('captcha')
  @UseInterceptors(ClassSerializerInterceptor)
  @NotLogin()
  @ApiOperation({
    summary: '发送验证码',
  })
  async getCaptcha() : Promise<CaptchaEntity>{
    const data = this.authService.genCaptcha()
    return new CaptchaEntity(data)
  }
 
  
  @Get('publicKey')
  @NotLogin()
  @ApiOperation({
    summary: '获取公钥'
  })
  getPublicKey(){
    return this.authService.getPublicKey()
  }

  @Post('refresh/token')
  @ApiOperation({
    summary: '刷新token'
  })
  async refreshToken(@Body() dto: RefreshTokenDTO){
    this.authService.refreshToken(dto)
  }

  //获取用户信息
  @Get('current/user')
  //@ts-ignore
  async getCurrentUser(@Req() req:Request) : Promise<UserVo> {
     let user = await this.userService.findUserById(req['userInfo'].userId)
     return user
  }

  //退出登录
  @Post('logout')
  async logout(@Req() req:Request): Promise<boolean>{
       //清除token和refreshToken
       return this.authService.logout(req)
  }
}
