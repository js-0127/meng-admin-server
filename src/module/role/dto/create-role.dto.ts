import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({description:'角色名称'})
    @IsNotEmpty({message: '角色名称不能为空'})
    name: string
    @ApiProperty({description:'角色代码'})
    @IsNotEmpty({message: '角色代码不能为空'})
    code: string
    
    @ApiProperty({description:'角色分配的菜单id'})
    menuIds: string[]
}
