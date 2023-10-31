import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
