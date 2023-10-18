import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';
import { RolePageDto } from './dto/role.page.dto';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
    ) {}

  @Post()
  @NotLogin()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('page')
  @NotLogin()
  async getRoleListByPage(@Query() query: RolePageDto) {
    return this.roleService.getRoleListByPage(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roleService.findOne(+id);
  // }

  @Put()
  updateRole(@Body('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto);
    
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete('delete')
  @NotLogin()
  async removeRole(@Query('id') id: string) {
    return  this.roleService.removeRole(id);
  }
}
