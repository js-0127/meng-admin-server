import { ApiProperty } from "@nestjs/swagger"

export class LoginLogDto {
    @ApiProperty({description:'页码'})
    page: string
    @ApiProperty({description:'每页数量'})
    size: string
    @ApiProperty({description:'用户名'})
    userName?: string
}