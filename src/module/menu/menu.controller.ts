import { Controller, Get, Post, Body, Put,Param, Delete, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { pageDto } from './dto/page.dto';
import { RoleAuth } from 'src/common/decorator/auth-role.decorator';


@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  
  @ApiOperation({
    summary: '菜单列表'
  })
  @Get('page')
  async findByPage(@Query() query: pageDto) {
    return this.menuService.findByPage(query);
  }
  
  @ApiOperation({
    summary: '菜单列表'
  })
  @Get()
  async findAllMenus() {
      return this.menuService.findAllMenus()
 }

  @ApiOperation({
  summary: '获取菜单子项'
  })
  @Get('children')
  async getChildren(@Query('parentId') parentId:string ) {    
      return this.menuService.getChildren(parentId)
  }


  @ApiOperation({
    summary: '创建菜单'
  })
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  
  @ApiOperation({
    summary: '更新菜单'
  })
  @Put()
  async update(@Body('id') id: string ,@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @ApiOperation({
    summary: '删除菜单',
    description: '需要管理员权限'

  })
  @RoleAuth('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
