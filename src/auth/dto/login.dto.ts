import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
export class LoginDto {
   
    @IsNotEmpty({message:'用户名不能为空'})
    accountNumber: string

    @IsNotEmpty({message: '密码不能为空'})
    password: string

    @IsNotEmpty({ message: '验证码不能为空' })
    captcha: string
    
    @IsNotEmpty({message:'公钥不能为空'})
    publicKey: string
}

export class CaptchaType {
    @ApiProperty()
    id: string;
    @ApiProperty()
    text: string;
    @ApiProperty()
    data: string;
    @ApiProperty()
    time: Date;
  }


