import { Global, Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/services/prisma.service';

@Global()
@Module({
  imports: [
    NestMinioModule.register(
      {
      isGlobal: true,
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'minio@123',
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService]
})
export class UploadModule {}
