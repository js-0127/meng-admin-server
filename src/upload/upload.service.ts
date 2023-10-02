import { Inject, Injectable } from '@nestjs/common';
import {MINIO_CONNECTION} from 'nestjs-minio'
import {Client} from 'minio'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
 private bucketName = 'meng-admin' 
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    private prisma: PrismaService
  ) {
  }

  async uploadFile(file:Express.Multer.File){
    const fileName = `${Date.now() + '-' + Math.round(Math.random() * 1e10)}_${file.originalname}`;
           // 上传文件到minio服务器
          await this.minioClient.putObject(this.bucketName, fileName, file.buffer)
          const fileEntity = await this.createFile(fileName)
          return fileEntity;
  }

  async createFile(fileName: string){
    const fileInfo = await this.prisma.$transaction(async(prisma) => {
      const fileEntity = await prisma.file.create({
        data: {
          pkName: 'user_avatar',
          fileName: fileName,
          filePath: `/${this.bucketName}/${fileName}`,
          userId: '37103725877133312',
        }
      })
      return fileEntity
    })

    return fileInfo;
  }
  }

