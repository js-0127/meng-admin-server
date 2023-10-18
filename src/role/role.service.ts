import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/services/prisma.service';
import { R } from 'src/utils/common/error';
import { RolePageDto } from './dto/role.page.dto';
import { omit } from 'lodash';

@Injectable()
export class RoleService {
    constructor(
      private readonly prisma: PrismaService
    ){}

  async create(createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);
    
      const count = await this.prisma.role.count({
        where: {
          code: createRoleDto.code
        }
      })

      if(count) {
        throw R.error('代码不能重复')
      }

     const role =  await this.prisma.role.create({
        data: {
          name: createRoleDto.name,
          code: createRoleDto.code
        }
      })

      return await this.prisma.$transaction(async (prisma) => {
        const roleMenus = await Promise.all(createRoleDto.menusId.map(async (menuId) => {
          const roleMenu = await prisma.role_Menu.create({
            data: {
              menuId: menuId,
              roleId: role.id
            }
          })
          return roleMenu
        }))
        return roleMenus
      })
      
  
  }
  async getRoleListByPage(rolePageDto: RolePageDto){
        const {page, size, name, code} = rolePageDto
        const where = {
          name: {
            contains: name
          },
          code: {
            contains: code
          }
        }
         
        const [data, total] = await Promise.all([
          this.prisma.role.findMany({
            skip: (+page - 1) * +size,
            take: +size,
            where,
            orderBy: {
              createdAt: 'desc'
            }
          }),
          this.prisma.role.count({where})
        ])

        return {
            data,
            total
        }
  }

 async getMenusByRoleId(roleId: string){
  const curRoleMenus = await this.prisma.role_Menu.findMany({
    where: {
      roleId
    }
  })
  return curRoleMenus
 }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    updateRoleDto = omit(updateRoleDto, ['id'])

    return await this.prisma.$transaction(async(prisma) => {
      const role = await prisma.role.update({
        where: {
          id
        }, 
        data: {
          ...updateRoleDto
        }
      })
      if(Array.isArray(updateRoleDto.menusId)){
        const existingRoleMenus = await prisma.role_Menu.findMany({
          where: {
            roleId: id
          }
        })
        const existingMenuIds = existingRoleMenus.map(roleMenu => roleMenu.menuId)
        const newMenuIds = updateRoleDto.menusId.filter(menuId => !existingMenuIds.includes(menuId))
        
        const roleMenusToDelete = existingRoleMenus.filter(roleMenu => !updateRoleDto.menusId.includes(roleMenu.menuId))
        const roleMenusToCreate = newMenuIds.map(menuId => {
          return prisma.role_Menu.create({
            data: {
              menuId: menuId,
              roleId: role.id
            }
          })
        })
        await prisma.role_Menu.deleteMany({
          where: {
            id: {
              in: roleMenusToDelete.map(roleMenu => roleMenu.id)
            }
          }
        })
        await Promise.all(roleMenusToCreate)
      }
      return role
    })
  }

   async removeRole(id: string) {
    console.log(id);
    
     return await this.prisma.$transaction(async(prisma) => {
       await Promise.all([
        prisma.role_Menu.deleteMany({
          where: {
            roleId: id
          }
        }) ,
        prisma.role.delete({
          where: {
            id
          }
         })
        
       ])
     })
  }
}
