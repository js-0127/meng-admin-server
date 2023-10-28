import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';
import { RolePageDto } from './dto/role.page.dto';
import { SetRoleMenuDto } from './dto/set-role-menu.dto';

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
  
  @Get()
  @NotLogin()
  async getAllRoles(){

    return this.roleService.getAllRoles()
  }

  @Get('list')
  @NotLogin()
  async getRoleListByPage(@Query() query: RolePageDto) {
    return this.roleService.getRoleListByPage(query);
  }

  @Get(':id')
  @NotLogin()
  getSingleRole(@Param('id') id: string) {
    return this.roleService.getSingleRole(id);
  }

  @Put()
  async updateRole(@Body('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @NotLogin()
  async removeRole(@Param('id') id: string) {
    return this.roleService.removeRole(id);
  }

  @Get('menu/list/:roleId')
  @NotLogin()
  async getRoleMenus(@Param('roleId') roleId: string) {
     return this.roleService.getMenusByRoleId(roleId)
  }

  @Post('alloc/menu') 
  @NotLogin()
  async setRoleMenus(@Body() setRoleMenuDto: SetRoleMenuDto) {
     return this.roleService.setRoleMenu(setRoleMenuDto)
  }
}
