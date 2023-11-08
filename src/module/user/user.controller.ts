import { Controller, Get, Post, Body, Param, Delete, Query,  Put, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { EmailService } from 'src/services/mail.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { pageDto } from './dto/page.dto';
import { R } from 'src/utils/common/error';
import { generateRandomCode } from 'src/utils/common/uuid';
import { RoleAuth } from 'src/common/decorator/auth-role.decorator';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('DEFAULT') private readonly redisClient: RedisClientType,
    private readonly emailService: EmailService         
    ) {}

  @ApiOperation({
    summary:'分页获取用户信息'
  })  
  @Get('list')
  async findByPage(@Query() query: pageDto) {
    return this.userService.findByPage(query)
  }

  @ApiOperation({
    summary: '创建用户'
  })
  @Post()
  async create(@Body() createUserDto: UserDto) {  
    return this.userService.createUser(createUserDto);
  }
  
  @ApiOperation({
    summary: '发送邮箱验证码'
  })
  @Post('/send/email/captcha')
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
 
  @ApiOperation({
    summary: '更新用户信息'
  })

  @Put()
  async update(@Body('id') id:string, @Body() body:UpdateUserDto){
    return this.userService.updateUser(id, body)
  }

  @ApiOperation({
    summary: '删除用户',
    description: '需要管理员权限'
  })
  @RoleAuth('admin')
  @Delete(':id')
  async delete(@Param('id') id:string){
      return this.userService.deleteUser(id)
  }
}
