import { Exclude } from "class-transformer";
import { CreateUserDto } from "../dto/create_user.dto";

export class UserEntity {
    @Exclude()
    password:string

    @Exclude()
    updateAt: Date

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
      }
}
