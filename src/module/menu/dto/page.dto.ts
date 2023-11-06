import { ApiProperty } from '@nestjs/swagger'
import {} from 'class-validator'

export class pageDto {
    @ApiProperty({description:'页码'})
    page: string | number
    @ApiProperty({description:'每页数量'})
    size: string | number
    @ApiProperty({description:'路由'})
    route?: string
}