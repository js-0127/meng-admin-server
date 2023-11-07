import { Global, Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/services/prisma.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestMinioModule.registerAsync({
      useFactory: (configService:ConfigService) => ({
        ...configService.get('minio'),
      }),
      inject: [ConfigService],
    })
     
  ],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService]
})
export class UploadModule {}
