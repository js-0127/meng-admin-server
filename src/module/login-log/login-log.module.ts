import { Module } from '@nestjs/common';
import { LoginLogController } from './login-log.controller';
import { LoginLogService } from './login-log.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [LoginLogController],
  providers: [LoginLogService, PrismaService],
})
export class LoginLogModule {}
