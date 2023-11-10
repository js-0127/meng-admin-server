import { Controller,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { NotLogin } from 'src/common/decorator/not-login.decorator';


@Controller('file')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    ) {}

  @ApiOperation({
    summary: '上传文件'
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @NotLogin()
  async uploadFile(@UploadedFile() file: Express.Multer.File){   
   return  await this.uploadService.uploadFile(file);
  }
  
}
