import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from './dto/user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update_user.dto';
import { omit} from 'lodash'
import { snowFlake } from 'src/utils/common/snow-flake';
import { RedisClientType } from 'redis';
import { R } from 'src/utils/common/error';
import { EmailService } from 'src/services/mail.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketMessageType } from 'src/socket/interface/message';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('DEFAULT') private readonly redisClient: RedisClientType,
    private readonly emailService: EmailService,
    private readonly socketGateway: SocketGateway
    ){}

    async findUserById(id: string){
      
        const user = await this.prisma.user.findUnique({
          where: {
            id
          }
        })
        
        const userRole = await this.prisma.user_Role.findMany(
          {
            where: {
              userId: id
            }
          }
        )
        
        const menuIds = await this.prisma.role_Menu.findMany({
          where: {
            roleId: {
              in : userRole.map((role) => role.roleId)
            }
          }
        })
        
        const menus = await this.prisma.menu.findMany({
          where: {
            id: {
              in : menuIds.map((menu) => menu.menuId)
            }
          }
        })
          const fileEntity = await this.prisma.file.findMany({
            where: {
              userId:id
            }
          })
        
        return Object.assign(user, {menus,fileEntity})
    }
   
  async findByPage(parma: { page: string | number; size: string | number; nickName?: string; phoneNumber?: string; }){
         const page = +parma.page ? +parma.page : 1
         const skip = (page - 1) * (+parma.size)
         const take = +parma.size
         const where = {
          nickName: {
            contains: parma.nickName || undefined,
          },
          phoneNumber: {
            contains: parma.phoneNumber || undefined,
          },
        };
         
        const [data, total] = await Promise.all([
          this.prisma.user.findMany({
            where,
            skip,
            take,
            include: {
              user_Role: true,
            }
          }),
          this.prisma.user.count({ where }),

        ]);
         
        const fileEntitys = await this.prisma.file.findMany()
       
        
        let newData = [];
         data.forEach((item) => {item = Object.assign(omit(item, ['password', 'updateAt'])); newData.push(item);
        })
          newData.map((item) => {
            item.user_Role = item.user_Role.map((item) => item.roleId)
         })
        
         newData.map((item) => {
           item.fileEntity = Object.assign(fileEntitys.filter((fileEntity) => fileEntity.userId === item.id))
           
         })
        return {
          data: newData,
          total
        }
  }
  
  async createUser(createUserDto: UserDto){
    const id = snowFlake.nextId().toString()
    const password = '123456'

    const emailCaptcha = await this.redisClient.get(`emailCaptcha:${createUserDto.email}`)
    if(emailCaptcha !== createUserDto.emailCaptcha){
      throw R.error('邮箱验证码错误或失效')
    } 
    await this.prisma.$transaction(async (prisma) => {
       await Promise.all([
        prisma.user.create({
          data: {
            id: id,
            ...omit(createUserDto, ['emailCaptcha', 'user_Role' ]),
            password: await hash(password),
            sex: +createUserDto.sex
          }
         })
       ])
       if(createUserDto.avatar){
        await Promise.all([
          prisma.file.updateMany({
            where: {
             filePath: createUserDto.avatar
            },
            data: {
             userId: id
            }
            })
        ])
       }
      const roleIdMap = createUserDto.user_Role.map((roleId) => {
         return  prisma.user_Role.create({
          data: {
            userId: id,
            roleId 
          }
         })
      })
      await Promise.all(roleIdMap)
      
      return roleIdMap

    })
      this.emailService.sendEmail({
      to: createUserDto.email,
      subject: 'meng-admin平台账号创建成功',
      html: `<div>
      <p><span style="color:#5867dd;">${createUserDto.nickName}</span>, 你的账号开通成功<p>
      <p>登录账号: ${createUserDto.email}</p>
      <p>登陆密码: ${password}</p>
      </div>
      `
     })
  }
  async updateUser(id:string, updateUserDto: UpdateUserDto){
    
    updateUserDto = Object.assign(omit(updateUserDto, ['fileEntity']))
    //根据用户id查询文件表
    const fileEntity = await this.prisma.file.findFirst({
     where: {
      userId: id
     }
    })
    const fileRecord = fileEntity?.filePath
    
    //查到文件，如果头像是空,将原来文件删除
    if(fileRecord && !updateUserDto.avatar) {
      await this.prisma.file.delete({
     where: {
      userId: id
     }
      })
    } else if(fileRecord && updateUserDto.avatar) {
      await this.prisma.file.update({
         where: {
          userId: id
         },
        data: {
          filePath: updateUserDto.avatar,
          fileName: undefined,
          userId: id
        },
      });
    } else if(!fileRecord && updateUserDto.avatar) {
      await this.prisma.file.updateMany({
        where: {
          filePath: updateUserDto.avatar
        },
        data: {
          userId: id
        }
      })
    } 
    
    const userRole = await this.prisma.user_Role.findMany({
      where: {
        userId: id
      }
    })
     
    const oldRole = userRole.map((o) => o.roleId)
    const newRole = updateUserDto.user_Role
     //判断用户分配角色有无变化，有的话，发消息给前端
     
     if(oldRole.length !== newRole.length){
      this.socketGateway.sendMessage(id, ({
        type: SocketMessageType.PermissionChange
      }))
     }

     //若数量相等，再看是否菜单一致，若是一致排序应该没问题,然后转化为字符串比较,因为数组如果地址不同，就算值相等，也会出错
     const oldRoleSortId = oldRole.sort()
     const newRoleSortId = newRole.sort()
     
     if(oldRoleSortId.join('') !== newRoleSortId.join('')){
      
     }

    //要删除的id
    const userRoleToDelete = oldRole.filter((item) => !newRole.includes(item))
    //要添加的id
    const userRoleToCreate = newRole.filter((item) => !oldRole.includes(item))
    return await this.prisma.$transaction(async(prisma) => {
    
      
      const createRoleMap = userRoleToCreate.map((roleId) => {
        return prisma.user_Role.create({
          data: {
            roleId,
            userId: id
          }
        })
      })
      const deleteRoleMap = await prisma.user_Role.deleteMany({
        where: {
          roleId: {
            in: userRoleToDelete
          }
        }
      })
      await Promise.all(createRoleMap)

      await prisma.user.update({
        where: {
          id
        },
        data: {
          ...omit(updateUserDto, ['emailCaptcha', 'user_Role'])
        }
      })

    })
  }

  async deleteUser( id:string){
    await this.prisma.$transaction(async(prisma) => {
       await Promise.all([
        prisma.file.deleteMany({
          where: {
            userId:id
          }
        }),
        prisma.user_Role.deleteMany({
          where: {
            userId: id
          }
        }),
        prisma.user.delete({
          where: {
            id
          }
        })
       ])
    })
  }

}
