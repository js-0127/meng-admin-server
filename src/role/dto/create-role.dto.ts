import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message: '角色名称不能为空'})
    name: string
    @IsNotEmpty({message: '角色代码不能为空'})
    code: string

    menusId: string[]
}
