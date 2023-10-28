import { Module } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { LoginLogController } from './login-log.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [LoginLogController],
  providers: [LoginLogService, PrismaService],
})
export class LoginLogModule {}
