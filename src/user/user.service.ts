import {  Injectable, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { hash, verify } from 'argon2';
import { UpdateUserDto } from './dto/update_user.dto';
import {has, omit} from 'lodash'
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    ){}
    
  async findAll() {
     const user = await this.prisma.user.findMany()
     return user
  }
   
  async findByPage(parma: { page: string | number; size: string | number; nickName: any; phoneNumber: any; }){
         const page = +parma.page ? +parma.page : 1
         let data = await this.prisma.user.findMany({
          skip:(page - 1) * (+parma.size),
          take: +parma.size
         })
         
         if(parma.nickName) {
          data = await this.prisma.user.findMany({
            where: {
              nickName:{
                contains: parma.nickName
              }
            }
          })
         }
        
         if(parma.phoneNumber) {
          data = await this.prisma.user.findMany({
            where: {
              phoneNumber: parma.phoneNumber
            }
          })
         }

        const total = await this.prisma.user.count()
       let newData = [];
         data.forEach((item) => {item = Object.assign(omit(item, ['password', 'updateAt'])); newData.push(item);
        })
        return {
          data: newData,
          total
        }
  }
  
  async findUserById(id:number) {
       const user = await this.prisma.user.findUnique({
        where: {
          id
        }
       })
       return user
  }


  async createUser(createUserDto: UserDto){
     return await this.prisma.user.create({
      data: {
        ...createUserDto,
        sex: +createUserDto.sex,
        password: await hash('123456')
      }
     })
  }

  async updateUser(id:number, updateUserDto: UpdateUserDto){
    return  await this.prisma.user.update({
      where: {
        id
      },
      data: {
          ...updateUserDto
      }
    })
  }

  async deleteUser( id:number){
     return await this.prisma.user.delete({
      where: {
        id
      }
     })
  }

}
