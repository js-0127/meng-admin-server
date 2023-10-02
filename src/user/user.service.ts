import {  Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { hash, verify } from 'argon2';
import { UpdateUserDto } from './dto/update_user.dto';
import { omit} from 'lodash'
import { snowFlake } from 'src/utils/common/snow-flake';
import { UploadService } from 'src/upload/upload.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly upload: UploadService
    ){}
    
  async findAll() {
     const user = await this.prisma.user.findMany()
     return user
  }
   
  async findByPage(parma: { page: string | number; size: string | number; nickName: any; phoneNumber: any; }){
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
              files: true,
            },
          }),
          this.prisma.user.count({ where }),
        ]);
         
        let newData = [];
         data.forEach((item) => {item = Object.assign(omit(item, ['password', 'updateAt'])); newData.push(item);
        })
        return {
          data: newData,
          total
        }
  }
  
  async findUserById(id:string) {
       const user = await this.prisma.user.findUnique({
        where: {
          id
        },   
       })
       
      return omit(user, ['password', 'avatar'])
  }

 
  async createUser(createUserDto: UserDto){
    const id = snowFlake.nextId().toString()

     await this.prisma.user.create({
      data: {
        id: id,
        ...createUserDto,
        sex: +createUserDto.sex,
        password: await hash('123456'),
        avatar: createUserDto.avatar.pkValue
      }
     })
       
     if(createUserDto.avatar){
      await this.prisma.file.updateMany({
        where: {
          userId: '37103725877133312'
        },
        data: {
          userId: id,
          pkValue: id
        }
      })
     }
  }
  async updateUser(id:string, updateUserDto: UpdateUserDto){
    //根据用户id查询文件表
    const fileRecord = await this.prisma.file.findFirst({
     where: {
      userId: id
     }
    })
    //查到文件，如果头像是空,将原来文件删除
    if(fileRecord && !updateUserDto.avatar) {
      await this.prisma.file.delete({
        where: {
          pkValue: fileRecord.pkValue
        }
      })
    } else if(fileRecord && updateUserDto.avatar && fileRecord.pkValue !== updateUserDto.avatar.pkValue) {
       //如果查到文件，并且有当前头像，但是文件的头像id不等于传过来的文件id
       //删除原来的文件
       //把当前用户id更新到新文件中
       await this.prisma.file.delete({
        where: {
          pkValue: fileRecord.pkValue,
        },
      });
  
      await this.prisma.file.create({
        data: {
          ...updateUserDto.avatar,
          userId: id,
        },
      });
    } else if(!fileRecord && updateUserDto.avatar) {
     const user = await this.prisma.file.create({
        data: {
         ...omit(updateUserDto.avatar, ['pkValue']),
         userId: id,
        }
      })
      console.log(user);
      
    }

    return  await this.prisma.user.update({
      where: {
        id
      },
      data: {
          ...updateUserDto,
          avatar: updateUserDto?.avatar?.pkValue ? updateUserDto.avatar.pkValue : '', 
          files: undefined
      }
    })
  }

  async deleteUser( id:string){
     return await this.prisma.user.delete({
      where: {
        id
      }
     })
  }

}
