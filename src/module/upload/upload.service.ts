import { Inject, Injectable } from '@nestjs/common';
import {MINIO_CONNECTION} from 'nestjs-minio'
import {Client} from 'minio'
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/services/prisma.service';


@Injectable()
export class UploadService {
 private bucketName = 'meng-admin' 
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    private readonly prisma: PrismaService,
  ) {
  }
  /**
   * @description 上传文件
   * @date 10/18/2023
   * @param file 
   */
  async uploadFile(file:Express.Multer.File){    
    const fileName = `${Date.now() + '-' + Math.round(Math.random() * 10)}_${file.originalname}`;
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

  /**
   * @description 执行定时任务，清除脏数据文件
   */
 @Cron('0 0 0 * * *')
 async clearEmptyUserIdFiles(){
    const fileRecordToDelete = await this.prisma.file.findMany({
      where: {
        userId: null
      }
    })
    await this.prisma.$transaction(async(prisma) => {
       await Promise.all([
        fileRecordToDelete.map(record => {
          this.minioClient.removeObject(this.bucketName, record.fileName)
        }),
        prisma.file.deleteMany({
          where: {
            userId: null
          }
        })
         
       ])
    })
  }
  }

