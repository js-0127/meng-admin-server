import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/services/prisma.service';
import { R } from 'src/utils/common/error';
import { RolePageDto } from './dto/role.page.dto';
import { omit } from 'lodash';
import { SetRoleMenuDto } from './dto/set-role-menu.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketMessageType } from 'src/socket/interface/message';


@Injectable()
export class RoleService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly socketGateway: SocketGateway
    ){}

  async getAllRoles(){
   return await this.prisma.role.findMany()
    }
 
  async getSingleRole(id:string){
    return await this.prisma.role.findUnique({
      where: {
        id
      }
    })
  }
  async create(createRoleDto: CreateRoleDto) {   
      const count = await this.prisma.role.count({
        where: {
          code: createRoleDto.code
        }
      })

      if(count) {
        throw R.error('代码不能重复')
      }

      return await this.prisma.$transaction(async (prisma) => {
        
        const role = await prisma.role.create({
          data: {
            name: createRoleDto.name,
            code: createRoleDto.code
          }
        })
        
       const roleMenus = createRoleDto.menuIds.map((menuId) => {
        
          return prisma.role_Menu.create({
            data: {
              menuId: menuId,
              roleId: role.id
            }
          })
        })
       await Promise.all(roleMenus)
       
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
   

     //跟用户改角色一样,先浅比较一下
     if(existingMenuIds.length !== newMenuIds.length) {
      //查到所有分配了该角色的用户发消息

      const userIds = (await this.prisma.user_Role.findMany({
        where: {
          roleId
        }
      })).map((userRole) =>userRole.userId)
      
      userIds.forEach((userId) => {
        this.socketGateway.sendMessage(userId, {
          type: SocketMessageType.PermissionChange
        })
      })
      

     //再深比较

     const oldMenuSortId = existingMenuIds.sort()
     const newMenuSortId = newMenuIds.sort()

     if(oldMenuSortId.join('') !== newMenuSortId.join('')){
      //查到所有分配了该角色的用户发消息

      const userIds = (await this.prisma.user_Role.findMany({
        where: {
          roleId
        }
      })).map((userRole) =>userRole.userId)
      
      userIds.forEach((userId) => {
        this.socketGateway.sendMessage(userId, {
          type: SocketMessageType.PermissionChange
        })
      })
      
     }

    const roleMenusToCreate = newMenuIds.map((menuId) => {
          console.log(menuId);
          
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
  }
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
      if(Array.isArray(updateRoleDto.menuIds)){
        const existingRoleMenus = await prisma.role_Menu.findMany({
          where: {
            roleId: id
          }
        })
        const existingMenuIds = existingRoleMenus.map(roleMenu => roleMenu.menuId)
        const newMenuIds = updateRoleDto.menuIds.filter(menuId => !existingMenuIds.includes(menuId))
        
       //跟用户改角色一样,先浅比较一下
       if(existingMenuIds.length !== newMenuIds.length) {
        //查到所有分配了该角色的用户发消息

        const userIds = (await this.prisma.user_Role.findMany({
          where: {
            roleId:id
          }
        })).map((userRole) =>userRole.userId)
        
       
       }

       //再深比较

       const oldMenuSortId = existingMenuIds.sort()
       const newMenuSortId = newMenuIds.sort()

       if(oldMenuSortId.join('') !== newMenuSortId.join('')){
        //查到所有分配了该角色的用户发消息

        const userIds = (await this.prisma.user_Role.findMany({
          where: {
            roleId:id
          }
        })).map((userRole) =>userRole.userId)
        
       
       }

        const roleMenusToDelete = existingRoleMenus.filter(roleMenu => !updateRoleDto.menuIds.includes(roleMenu.menuId))

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
