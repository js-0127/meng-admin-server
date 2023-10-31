import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiService } from './api.service';
import { NotLogin } from 'src/common/decorator/not-login.decorator';


@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
   
  @Get()
  @NotLogin()
  getController(){
    return this.apiService.getModule()
  }
 
 
}
