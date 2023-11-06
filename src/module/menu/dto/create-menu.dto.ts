import { ApiProperty } from "@nestjs/swagger"

export class CreateMenuDto {
    @ApiProperty({description:'图标'})
    icon: string
    @ApiProperty({description:'名称'})
    name: string
    @ApiProperty({description:'父级id'})
    parentId: string
    @ApiProperty({description:'类型'})
    type: number
    @ApiProperty({description:'路由'})
    route: string
    @ApiProperty({description:'排序号'})
    orderNumber?:number
    @ApiProperty({description:'url地址'})
    url?: string
    @ApiProperty({description:'按钮权限码'})
    authCode?: string
    @ApiProperty({description:'显示与否'})
    show?: boolean
    @ApiProperty({description:'文件地址'})
    filePath?: string
}
