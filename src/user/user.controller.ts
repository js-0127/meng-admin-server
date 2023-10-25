import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe,  Put, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';
import { R } from 'src/utils/common/error';
import { generateRandomCode } from 'src/utils/common/uuid';
import { RedisClientType } from 'redis';
import { EmailService } from 'src/services/mail.service';
import { pageDto } from './dto/page.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('DEFAULT') private readonly redisClient: RedisClientType,
    private readonly emailService: EmailService         
    ) {}

  @Post()
  @NotLogin()
  create(@Body() createUserDto: UserDto) {  
    return this.userService.createUser(createUserDto);
  }
 
  @Post('/send/email/captcha')
  @NotLogin()
  async sendEmailCaptcha(@Body() emailInfo: {email: string}){
      if(!emailInfo) {
        throw R.error('邮箱不能为空');
      }
      //生成随机四位数
      const emailCaptcha = generateRandomCode()
      //生成的数据存在redis中,后面添加用户做验证
      await this.redisClient
      .multi()
      .set(
        `emailCaptcha:${emailInfo.email}`,
         emailCaptcha,
      )
      .expire( `emailCaptcha:${emailInfo.email}`, 60 * 30) //30min
      .exec()
      
      this.emailService.sendEmail({
            to: emailInfo.email,
            html: `<div>
            您本次的验证码是<span style="color:#5867dd; font-weight:888; font-size:24px">${emailCaptcha}</span>, 验证码有效期是30分钟 </div>`,
            subject: 'meng-admin平台邮箱检验提醒'
      })
  }
  @Get('list')
  @NotLogin()
  findByPage(@Query() query: pageDto) {
    
   return this.userService.findByPage(query)
  }

  @Put()
  @NotLogin()
  update(@Body('id') id:string, @Body() body:UpdateUserDto){
    return this.userService.updateUser(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id:string){
      return this.userService.deleteUser(id)
  }
}
