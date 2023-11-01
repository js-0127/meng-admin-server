import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/services/prisma.service';
import { R } from 'src/utils/common/error';
import { pageDto } from './dto/page.dto';
import { omit } from 'lodash';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService){}
  async create(createMenuDto: CreateMenuDto) {
    if(createMenuDto.route){
      const menu = await this.prisma.menu.findFirst({
        where: {
          route: createMenuDto.route
        }
      })
      if(menu){
        throw R.error('当前路由已存在');
        
      }
    }
    return await this.prisma.menu.create({
      data: {
        ...createMenuDto,
      }
     })
  }

   async findAllMenus(){
    return await this.prisma.menu.findMany()
   }


  async findByPage(query:pageDto) {
    const page = +query.page ? +query.page : 1
         const skip = (page - 1) * (+query.size)
         const take = +query.size
         const where = {
          route: {
            contains: query.route || undefined
          }
        };
        const [data, total] = await Promise.all([
          this.prisma.menu.findMany({
            where,
            skip,
            take,
          }),
          this.prisma.menu.count({ where }),
        ]);
        if (!data.length) return { data: [], total: 0 };
        
        const countMap = await this.prisma.menu.groupBy({
          by: 'parentId',
          _count: {
            id: true
          },
        
        })
        
        const newArr = data.filter((item) => !item.parentId)
        const result = newArr.map((item) => {
          const count = countMap.find((o) => o.parentId === item.id)?._count.id || 0;
          
          return {
              ...item,
              hasChild: Number(count) > 0
          }
        })
        
        return {
          data: result,
          total
        }
  }

  async getChildren(parentId: string){
           if(!parentId){
            throw R.validateError('父节点id不能为空')
           }

           const data = await this.prisma.menu.findMany({
            where: {
              parentId,
            },
            orderBy: {
              orderNumber: 'asc'
            }
           })

           if(!data.length) return []
           const countMap = await this.prisma.menu.groupBy({
            by: 'parentId',
            _count: {
              id: true
            },
          })

          const result = data.map((item) => {
            const count = countMap.find((o) => o.parentId === item.id)?._count.id || 0;
            return {
              ...item,
              hasChild: Number(count) > 0
          }
          })
          
          return result
        }


  findOne(id: string) {
    return `This action returns a #${id} menu`;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {

    updateMenuDto = omit(updateMenuDto, ['id', 'hasChild', 'children'])
     return await this.prisma.menu.update({
      where: {
        id
      },
      data: {
        ...updateMenuDto,
        type: +updateMenuDto.type,
        show: Boolean(updateMenuDto.show),
        orderNumber: +updateMenuDto.orderNumber,
        parentId: updateMenuDto.parentId
      }
     })
  }

  async remove(id: string) {
        await this.prisma.$transaction(async(prisma) => {
         await Promise.all([
          prisma.role_Menu.deleteMany({
            where: {
              menuId: id
            }
          }),
          prisma.menu.delete({
          where: {
            id
            }
        }),
       ])
        })
  }

}
