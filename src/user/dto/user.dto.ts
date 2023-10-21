import { ApiProperty } from '@nestjs/swagger'
import {IsNotEmpty, IsPhoneNumber, IsEmail} from 'class-validator'
import { IsExistRule } from 'src/utils/user/is_exist'
export class UserDto {
    @ApiProperty({ description: 'id' })
    id: string

    @IsExistRule('user', { message: '用户名已存在' })
    @ApiProperty({ description: '用户名称' })
    @IsNotEmpty({message: '用户名不能为空'})
    userName: string
    
    @ApiProperty({ description: '用户昵称' })
    @IsNotEmpty({message: '用户昵称不能为空'})
    nickName: string
    
    @IsExistRule('user', { message: '手机号已注册' })
    @ApiProperty({ description: '手机号' })
    @IsPhoneNumber('CN', {
        message: '无效的手机号',
    })
    phoneNumber: string
    
    @IsExistRule('user', { message: '邮箱已注册' })
    @ApiProperty({ description: '邮箱' })
    @IsEmail({},{message: '无效的邮箱'})
    email: string
     
    @ApiProperty({ description: '邮箱验证码' })
    emailCaptcha: string

    @ApiProperty({ description: '密码' })
    password: string

    @ApiProperty({ description: '头像', nullable:true })
    avatar?: string

    @ApiProperty({ description: '性别(0:女, 1:男)', nullable:true })
    sex?: number;

    user_Role?: string[]
}
