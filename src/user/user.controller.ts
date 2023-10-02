import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe,  Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @NotLogin()
  create(@Body() createUserDto: UserDto) {   
    console.log(createUserDto);
     
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
  update(@Body('id') id:string, @Body() body:UpdateUserDto){
    return this.userService.updateUser(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id:string){
      return this.userService.deleteUser(id)
  }
}
