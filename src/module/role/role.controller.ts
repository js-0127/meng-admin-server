import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolePageDto } from './dto/role.page.dto';
import { SetRoleMenuDto } from './dto/set-role-menu.dto';
import { RoleAuth } from 'src/common/decorator/auth-role.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
   
  @ApiOperation({
    summary: '获取全部角色'
  })
  @Get()
  async getAllRoles(){
      return this.roleService.getAllRoles()
  }
  
  @ApiOperation({
    summary: '分页获取角色列表'
  })
  @Get('list')
  async getRoleListByPage(@Query() query: RolePageDto) {
      return this.roleService.getRoleListByPage(query);
  }
  
  @ApiOperation({
    summary: '获取单个角色'
  })
  @Get(':id')
  async getSingleRole(@Param('id') id: string) {
      return this.roleService.getSingleRole(id);
  }

  @ApiOperation({
    summary: '获取角色对应的菜单'
  })
  @Get('menu/list/:roleId')
  async getRoleMenus(@Param('roleId') roleId: string) {
     return this.roleService.getMenusByRoleId(roleId)
  }

  @ApiOperation({
    summary: '创建角色'
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '为角色分配菜单'
  })
  @Post('alloc/menu') 
  async setRoleMenus(@Body() setRoleMenuDto: SetRoleMenuDto) {
     return this.roleService.setRoleMenu(setRoleMenuDto)
  }

  
  @ApiOperation({
    summary: '更新角色'
  })
  @Put()
  async updateRole(@Body('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @ApiOperation({
    summary: '删除角色',
    description: '需要管理员权限'
  })
  @RoleAuth('admin')
  @Delete(':id')
  async removeRole(@Param('id') id: string) {
    return this.roleService.removeRole(id);
  }

  
 
}
