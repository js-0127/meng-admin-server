import { ApiProperty } from "@nestjs/swagger"

export class RolePageDto {
    @ApiProperty({description: '页码'})
    page: string
    @ApiProperty({description: '当前页数'})
    size: string
    @ApiProperty({description: '角色名称'})
    name?: string
    @ApiProperty({description: '角色代码'})
    code?: string
}