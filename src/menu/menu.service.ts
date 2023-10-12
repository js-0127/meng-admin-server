import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/services/prisma.service';
import { R } from 'src/utils/common/error';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService){}
  async create(createMenuDto: CreateMenuDto) {
   
    const menu = await this.prisma.menu.findFirst({
      where: {
        route: createMenuDto.route
      }
    })
    if(menu){
      throw R.error('当前路由已存在');
      
    }

    return await this.prisma.menu.create({
      data: {
        ...createMenuDto,
        type: +createMenuDto.type,
        orderNumber: +createMenuDto.orderNumber,
        show: Boolean(createMenuDto.show)
      }
     })
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
     return await this.prisma.menu.update({
      where: {
        id
      },
      data: {
        ...updateMenuDto,
        type: +updateMenuDto.type,
        show: Boolean(updateMenuDto.show),
        orderNumber: +updateMenuDto.orderNumber
      }
     })
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
