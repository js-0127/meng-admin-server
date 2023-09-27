import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { createClient } from 'redis';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, {
    provide: 'REDIS_CLIENT',
    async useFactory(){
      const client = createClient({
        socket: {
          host: process.env.RD_HOST,
          port: parseInt(process.env.RD_PORT),
        },
      })
      await client.connect();
      return client;
    }
  }],
})
export class AuthModule {}
