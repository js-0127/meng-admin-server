import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {  CaptchaEntity } from './entities/captcha.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  

  @Post('login')
  login(@Body() loginDto:LoginDto){
     return this.authService.login(loginDto)
  }
  
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('captcha')
  @ApiOperation({
    summary: '发送验证码',
  })
  async getCaptcha() : Promise<CaptchaEntity>{
    const data = this.authService.genCaptcha()
    return new CaptchaEntity(data)
  }

  @Get('publicKey')
  getPublicKey(){
    return this.authService.getPublicKey()
  }
}
