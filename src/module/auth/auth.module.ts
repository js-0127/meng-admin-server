import { Module } from '@nestjs/common';
import { CacheModule } from 'src/module/cache/cache.module';
import { UserModule } from 'src/module/user/user.module';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/services/prisma.service';
import { AuthService } from './auth.service';
import { UserService } from 'src/module/user/user.service';
import { EmailService } from 'src/services/mail.service';
import { RsaService } from 'src/services/rsa.service';
import { SocketGateway } from 'src/socket/socket.gateway';


@Module({
  imports: [CacheModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, EmailService, RsaService, SocketGateway],
})
export class AuthModule {}
