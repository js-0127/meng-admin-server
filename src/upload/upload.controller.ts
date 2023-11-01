import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { UploadService } from './upload.service';
import { NotLogin } from 'src/common/decorator/not-login.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {Request} from 'express'

@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @NotLogin()
  @UseInterceptors(FileInterceptor('file'))

  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req:Request){   
    
   return  await this.uploadService.uploadFile(file);
  }

}
