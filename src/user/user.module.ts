import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [UploadModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, UploadService],
  exports: [UserService]
})
export class UserModule {}
