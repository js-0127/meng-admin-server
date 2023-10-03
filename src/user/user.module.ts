import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { EmailService } from 'src/services/mail.service';

@Module({
  imports: [UploadModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService, UploadService ],
  exports: [UserService]
})
export class UserModule {}
