import { InjectQueue, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UploadService } from 'src/upload/upload.service';

// 每天凌晨00:00:00定时执行下面清理文件的方法


export class ClearFileProcessor  {
  constructor(
    private readonly fileService:UploadService,
    @InjectQueue('clearDirtyFile') private readonly clearQueue: Queue,
    
    ){}

  async execute() {
    // 调用文件服务里清理文件方法
    this.fileService.clearEmptyUserIdFiles();
  }
}
