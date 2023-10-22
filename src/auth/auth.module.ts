import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/services/prisma.service';
import { CacheModule } from 'src/cache/cache.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/services/mail.service';
import { RsaService } from 'src/services/rsa.service';
import { SocketService } from 'src/socket/socket.service';


@Module({
  imports: [CacheModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, EmailService, RsaService, SocketService],
})
export class AuthModule {}
