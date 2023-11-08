import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { PrismaService } from 'src/services/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolePageDto } from './dto/role.page.dto';
import { SetRoleMenuDto } from './dto/set-role-menu.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketMessageType } from 'src/socket/interface/message';
import { R } from 'src/utils/common/error';


@Injectable()
export class RoleService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly socketGateway: SocketGateway
    ){}
  /**
   * @description 获取全部角色
   * @date 10/15/2023
   */
  async getAllRoles(){
   return await this.prisma.role.findMany()
    }
 
  /**
   * @description 获取单个角色
   * @date 10/15/2023
   */
  async getSingleRole(id:string){
    return await this.prisma.role.findUnique({
      where: {
        id
      }
    })
  }

  /**
   * @description 创建角色
   * @date 10/15/2023
   */
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
  /**
   * @description 分页回去角色列表
   * @date 10/15/2023
   */
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

 /**
  * @description 通过角色id获取菜单
  * @date 10/16/2023
  * @param roleId 
  */  
 async getMenusByRoleId(roleId: string){
  const curRoleMenus = await this.prisma.role_Menu.findMany({
    where: {
      roleId
    }
  })
  return curRoleMenus.map((o) => o.menuId)
 }

 /**
  * @description 为角色分配菜单
  * @date 10/16/2023
  * @param setRoleMenuDto 
  */
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
 
  /**
   * @description 更新角色
   * @date 10/16/2023
   * @param id 
   * @param updateRoleDto 
   */
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

        userIds.forEach((userId) => this.socketGateway.sendMessage(userId,{
          type: SocketMessageType.PermissionChange
        }))
       
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

    
   /**
    * @description 移除角色
    * @date 10/16/2023
    * @param id 
    */
   async removeRole(id: string) {
      await this.prisma.$transaction(async(prisma) => {
       await Promise.all([
        prisma.role_Menu.deleteMany({
          where: {
            roleId: id
          }
        }),
        prisma.user_Role.deleteMany({
          where: {
            roleId: id
          }
         }),
        prisma.role.delete({
          where: {
            id
          }
         })
       ])
     })

  }
}
