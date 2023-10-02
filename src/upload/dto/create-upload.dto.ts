import { ApiProperty } from "@nestjs/swagger"

export class CreateUploadDto {
    @ApiProperty({description: '文件名'})
    fileName?: string
    @ApiProperty({description: '文件路径'})
    filePath?: string
    @ApiProperty({description: '外键名称'})
    pkNmae: string
    @ApiProperty({description: '外键值'})
    pkValue?: string

}
