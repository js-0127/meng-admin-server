import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../dto/user.dto";
export class UserVo extends OmitType(UserDto, ['password', 'emailCaptcha', 'avatar'] ){
    @ApiProperty({description: '图片路径'})
    avatar?: string;
}