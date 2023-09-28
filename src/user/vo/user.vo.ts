import { OmitType } from "@nestjs/mapped-types";
import { UserDto } from "../dto/user.dto";

export class UserVo extends OmitType(UserDto, ['password'] ){

}