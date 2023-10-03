import {  Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from './dto/user.dto';
import { hash, verify } from 'argon2';
import { UpdateUserDto } from './dto/update_user.dto';
import { omit} from 'lodash'
import { snowFlake } from 'src/utils/common/snow-flake';
import { UploadService } from 'src/upload/upload.service';
import { RedisClientType } from 'redis';
import { R } from 'src/utils/common/error';
import { EmailService } from 'src/services/mail.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly upload: UploadService,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    private readonly emailService: EmailService
    ){}


    async findUserById(id: string){
        return await this.prisma.user.findUnique({
          where: {
            id
          }
        })
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
  
  async createUser(createUserDto: UserDto){
    const id = snowFlake.nextId().toString()
    const password = '123456'

    const emailCaptcha = await this.redisClient.get(`emailCaptcha:${createUserDto.email}`)
    if(emailCaptcha !== createUserDto.emailCaptcha){
      throw R.error('邮箱验证码错误或失效')
    } 
     await this.prisma.user.create({
      data: {
        id: id,
        ...omit(createUserDto, ['emailCaptcha']),
        password: await hash(password),
        avatar: createUserDto.avatar?.pkValue ? createUserDto.avatar?.pkValue : undefined
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
