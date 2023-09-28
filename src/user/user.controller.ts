import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe,  Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {    
    return this.userService.createUser(createUserDto);
  }
 
  @Get()
  @NotLogin()
  findAll() {
    return this.userService.findAll();
  }

  
  @Get('page')
  @NotLogin()
  findByPage(@Query() query: any) {
   return this.userService.findByPage(query)
  }


  @Put()
  update(@Body('id', ParseIntPipe) id:number, @Body() body:UpdateUserDto){
    return this.userService.updateUser(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id:number){
      return this.userService.deleteUser(id)
  }
}
