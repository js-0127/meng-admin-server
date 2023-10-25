import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { EmailService } from 'src/services/mail.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [UploadModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService, UploadService, SocketGateway],
  exports: [UserService]
})
export class UserModule {}
