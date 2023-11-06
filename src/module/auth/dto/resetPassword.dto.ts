import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator'

export class ResetPasswordDto {
    @ApiProperty({ description: '密码' })
    @IsNotEmpty({message: '密码不能为空'})
    password: string;

    @ApiProperty({ description: '邮箱' })
    @IsEmail({},{message: '无效的邮箱'})
    email: string;

    @ApiProperty({ description: '邮箱验证码' })
    @IsNotEmpty({message: '邮箱验证码不能为空'})
    emailCaptcha: string;
    
    @ApiProperty({ description: '公钥' })
    @IsNotEmpty({message: '公钥不能为空'})
    publicKey: string;
}