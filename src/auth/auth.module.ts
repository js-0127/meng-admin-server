import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheModule } from 'src/cache/cache.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [CacheModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
})
export class AuthModule {}
