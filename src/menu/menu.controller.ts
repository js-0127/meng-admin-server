import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { NotLogin } from 'src/common/decorator/not-login.decorator';
import { pageDto } from './dto/page.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  
  @NotLogin()
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  @NotLogin()
  @Get('page')
  async findByPage(@Query() query: pageDto) {
    return this.menuService.findByPage(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }
  
  @Get('children')
  async getChildren(@Param('parentId') parentId:string ) {
      return this.menuService.getChildren(+parentId)
  }

  @NotLogin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }
  
  @NotLogin()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
