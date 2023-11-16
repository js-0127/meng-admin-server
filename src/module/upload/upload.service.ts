import { Inject, Injectable } from '@nestjs/common';
import {MINIO_CONNECTION} from 'nestjs-minio'
import {Client} from 'minio'
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/services/prisma.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UploadService {

  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {
  }
  /**
   * @description 上传文件
   * @date 10/18/2023
   * @param file 
   */
  async uploadFile(file:Express.Multer.File){    
    const fileName = `${Date.now() + '-' + Math.round(Math.random() * 10)}_${file.originalname}`;
    const filePath = `/file/${this.configService.get('bucket').name}/${fileName}`
           // 上传文件到minio服务器
          const fileEntity = await this.createFile(fileName, filePath)
          await this.minioClient.putObject(this.configService.get('bucket').name, fileName, file.buffer)
          return fileEntity;
  }
  async createFile(fileName: string,filePath:string){
      const fileEntity = await this.prisma.file.create({
        data: {
          fileName,
          filePath,
          userId: null
        }
      })
      return fileEntity
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
          this.minioClient.removeObject(this.configService.get('bucket').name, record.fileName)
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

