import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/services/prisma.service';
import { EmailService } from 'src/services/mail.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService, SocketGateway],
  exports: [UserService]
})
export class UserModule {}
