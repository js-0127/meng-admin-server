import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaService } from 'src/services/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';


@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, SocketGateway],

})
export class RoleModule {}
