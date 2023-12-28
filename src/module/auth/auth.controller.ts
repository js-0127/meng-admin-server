import { Controller, Get, Post, Body, ClassSerializerInterceptor, UseInterceptors, Req } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { UserService } from 'src/module/user/user.service'
import { AuthService } from './auth.service'
import { RsaService } from 'src/services/rsa.service'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDTO } from './dto/refreshToken.dto'
import { ResetPasswordDto } from './dto/resetPassword.dto'
import { UserVo } from 'src/module/user/dto/user-vo.dto'
import { CaptchaEntity } from './entities/captcha.entity'
import { NotLogin } from 'src/common/decorator/not-login.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly RsaService: RsaService,
  ) {}

  @ApiOperation({
    summary: '登录',
  })
  @Post('login')
  @NotLogin()
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(loginDto, req)
  }

  @ApiOperation({
    summary: '发送验证码',
  })
  @Get('captcha')
  @UseInterceptors(ClassSerializerInterceptor)
  @NotLogin()
  async getCaptcha(): Promise<CaptchaEntity> {
    const data = await this.authService.genCaptcha()
    return new CaptchaEntity(data)
  }

  @ApiOperation({
    summary: '获取公钥',
  })
  @Get('publicKey')
  @NotLogin()
  async getPublicKey() {
    return this.RsaService.getPublicKey()
  }

  @ApiOperation({
    summary: '刷新token',
  })
  @Post('refresh/token')
  @NotLogin()
  async refreshToken(@Body() dto: RefreshTokenDTO) {
    this.authService.refreshToken(dto)
  }

  @ApiOperation({
    summary: '获取用户信息',
  })
  @Get('current/user')
  async getCurrentUser(@Req() req: Request): Promise<UserVo> {
    let user = await this.userService.findUserById(req['userInfo'].userId)
    return user
  }

  @ApiOperation({
    summary: '退出登录',
  })
  @Post('logout')
  async logout(@Req() req: Request): Promise<boolean> {
    //清除token和refreshToken
    return this.authService.logout(req)
  }

  @ApiOperation({
    summary: '修改密码时邮箱验证码',
  })
  @Post('send/reset/password/email')
  @NotLogin()
  async sendResetPasswordEmail(@Body() emailInfo: { email: string }) {
    return this.authService.sendResetPasswordEmail(emailInfo)
  }

  @ApiOperation({
    summary: '修改密码',
  })
  @Post('reset/password')
  @NotLogin()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto)
  }
}
