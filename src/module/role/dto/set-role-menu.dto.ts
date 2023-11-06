import { ApiProperty } from "@nestjs/swagger"

export class SetRoleMenuDto {
    @ApiProperty({ description: '选中的菜单id' })
    checkedKeys: string[]
    @ApiProperty({ description: '角色id' })
    roleId: string
}