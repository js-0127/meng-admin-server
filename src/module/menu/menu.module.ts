import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service'
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService,],
})
export class MenuModule {}
