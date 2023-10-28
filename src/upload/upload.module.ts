import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { NestMinioModule } from 'nestjs-minio';
import { PrismaService } from 'src/services/prisma.service';

@Global()
@Module({
  imports: [
    NestMinioModule.register(
      {
      isGlobal: true,
      endPoint: 'my-minio',
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
