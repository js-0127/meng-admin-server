import { Controller, Get, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { LoginLogDto } from './dto/login-login-page.dto';

@Controller('login-log')
export class LoginLogController {
  constructor(
    private readonly loginLogService: LoginLogService,

    ) {}
   @Get()
   async getLoginLogByPage(@Query() loginLogDto: LoginLogDto){
        return this.loginLogService.getLoginLogByPage(loginLogDto)
   }
}
