import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/services/prisma.service';
import { R } from 'src/utils/common/error';
import { RolePageDto } from './dto/role.page.dto';
import { omit } from 'lodash';
import { SetRoleMenuDto } from './dto/set-role-menu.dto';

@Injectable()
export class RoleService {
    constructor(
      private readonly prisma: PrismaService
    ){}

  async getAllRoles(){
   return await this.prisma.role.findMany()
    }

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

     const role = await this.prisma.role.create({
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
  console.log(curRoleMenus);
  
  return curRoleMenus.map((o) => o.menuId)
 }


 async setRoleMenu(setRoleMenuDto: SetRoleMenuDto) {
  const {checkedKeys, roleId} = setRoleMenuDto

  return await this.prisma.$transaction(async (prisma) => {
    const curRoleMenus= await this.prisma.role_Menu.findMany({
      where: {
        roleId
      }
    })
     
    const existingMenuIds = curRoleMenus.map(roleMenu => roleMenu.menuId)
    const newMenuIds = checkedKeys.filter(menuId => !existingMenuIds.includes(menuId))
    const roleMenusToDelete = curRoleMenus.filter(roleMenu => !checkedKeys.includes(roleMenu.menuId))

    const roleMenusToCreate = newMenuIds.map((menuId) => {
          return prisma.role_Menu.create({
            data: {
              roleId,
              menuId
            }
          })
    })

     await prisma.role_Menu.deleteMany({
      where: {
        id: {
           in: roleMenusToDelete.map((o) => o.id)
        }
      }
    })
    await Promise.all(roleMenusToCreate)
  })
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
