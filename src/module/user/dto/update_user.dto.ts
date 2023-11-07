import {PartialType} from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { UserDto } from './user.dto';
import { fileEntity } from 'src/module/upload/interface/fileEntity';


export class UpdateUserDto extends PartialType(UserDto){
    @ApiProperty({ description: '用户名称' })
    @IsNotEmpty({message: '用户名不能为空'})
    userName: string

    @ApiProperty({ description: '手机号' })
    @IsPhoneNumber('CN', {
        message: '无效的手机号',
    })
    phoneNumber: string

    @ApiProperty({ description: '邮箱' })
    @IsEmail({},{message: '无效的邮箱'})
    email: string

    fileEntity: fileEntity[]
}