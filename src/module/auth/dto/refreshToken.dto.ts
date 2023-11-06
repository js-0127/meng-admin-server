import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator'

export class RefreshTokenDTO {
  @ApiProperty({
    description: '刷新token',
  })
  refreshToken?: string;
}
