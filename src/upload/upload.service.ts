import { Inject, Injectable } from '@nestjs/common';
import {MINIO_CONNECTION} from 'nestjs-minio'
import {Client} from 'minio'
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UploadService {
 private bucketName = 'meng-admin' 
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    private prisma: PrismaService
  ) {
  }

  async uploadFile(file:Express.Multer.File){
    const fileName = `${new Date().getTime()}_${file.filename}`;;
           // 上传文件到minio服务器
          const fileEntity = await this.createFile(fileName)
          await this.minioClient.putObject(this.bucketName, fileName, file.buffer)
          return fileEntity;
  }
  async createFile(fileName: string){
    const fileInfo = await this.prisma.$transaction(async(prisma) => {
      const fileEntity = await prisma.file.create({
        data: {
          fileName: fileName,
          filePath: `/upload/${this.bucketName}/${fileName}`,
          userId: null
        }
      })
      return fileEntity
    })
    return fileInfo;

  }


 async clearEmptyUserIdFiles(){
    const curDate = new Date();
    curDate.setDate(curDate.getDate() - 1);
   
    const fileRecordToDelete = await this.prisma.file.findMany({
      where: {
        userId: null
      }
    })
    await this.prisma.$transaction(async(prisma) => {
       await Promise.all([
        fileRecordToDelete.map(record => {
          this.minioClient.removeObject(this.bucketName, record.fileName)
        })
       ])
    })
  }
  }

