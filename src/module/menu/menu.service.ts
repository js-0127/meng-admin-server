import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { PrismaService } from 'src/services/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { pageDto } from './dto/page.dto';
import { R } from 'src/utils/common/error';

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    ){}

  /**
   * @description 创建菜单
   * @date 10/10/2023
   * @param createMenuDto 
   */  
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
   
  /**
   * @description 获取所有菜单
   * @date 10/10/2023
   */
   async findAllMenus(){
    return await this.prisma.menu.findMany()
   }

  /**
   * @description 分页获取菜单
   * @date 10/10/2023
   */
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
  /**
   * @description 获取子菜单
   * @date 10/12/2023
   * @param parentId 
   */
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

  /**
   * @description 获取单个菜单 
   * @date 10/10/2023
   * @param id 
   */
  findOne(id: string) {
    return `This action returns a #${id} menu`;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    updateMenuDto = omit(updateMenuDto, ['id', 'hasChild', 'children', '_loaded_'])
         await this.prisma.menu.update({
          where: {
            id
          },
          data: {
            ...updateMenuDto
          }
         })
  }
  
  /**
   * @description 移除菜单
   * @date 10/14/2023
   * @param id 
   */
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
