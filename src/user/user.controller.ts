import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {    
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @Get('page')
  findByPage(@Query() query: any) {
   return this.userService.findByPage(query)
  }


  @Patch()
  update(@Body('id', ParseIntPipe) id:number, @Body() body:UpdateUserDto){
    return this.userService.updateUser(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id:number){
      return this.userService.deleteUser(id)
  }
}
