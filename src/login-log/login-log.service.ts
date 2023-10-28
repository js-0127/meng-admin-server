import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { LoginLogDto } from './dto/login-login-page.dto';


@Injectable()
export class LoginLogService {
  constructor(
    private readonly prisma: PrismaService
  ){}

 async getLoginLogByPage(loginLogDto:LoginLogDto) {
   const {page, size, userName}  = loginLogDto

   const where = {
    userName: {
      contains: userName
    }
   }

   const [data, total] = await Promise.all([
      this.prisma.login_Log.findMany({
        skip: (+page - 1) * +size,
        take: +size,
        where,
      }),
      this.prisma.login_Log.count({where})
   ])
   
   return {
    data,
    total
   }
     
 }

}
