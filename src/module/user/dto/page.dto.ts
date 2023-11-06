import { ApiProperty } from '@nestjs/swagger'
export class pageDto {
    @ApiProperty({description: '页码'})
    page: string | number
    @ApiProperty({description: '每页条数'})
    size: string | number
    @ApiProperty({description: '昵称'})
    nickName? :string
    @ApiProperty({description: '手机号'})
    phoneNumber?: string
}