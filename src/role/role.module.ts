import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/services/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';


@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, SocketGateway],

})
export class RoleModule {}
