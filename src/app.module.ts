import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {ConfigModule, ConfigService}  from '@nestjs/config'
import * as path  from 'path';
import { ScheduleModule } from '@nestjs/schedule'
import {  
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import config from './config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { MenuModule } from './module/menu/menu.module';
import { RoleModule } from './module/role/role.module';
import { SocketModule } from './socket/socket.module';
import { LoginLogModule } from './module/login-log/login-log.module';
import { CacheModule } from './module/cache/cache.module';
import { UploadModule } from './module/upload/upload.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { LoggerService } from './services/logger.service';
import { EmailService } from './services/mail.service';
import {LoggerMiddleware} from "./common/middware/logger.middleware";
import { AuthInterceptor } from './common/interceptor/auth.interceptor';

@Module({
  imports: [
    UserModule, 
    I18nModule.forRoot({
    fallbackLanguage: 'zh-CN',
    loaderOptions: {
      path: path.join(__dirname, '/i18n/'),
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
    ]
    }),
    ScheduleModule.forRoot(),
    AuthModule, 
    ConfigModule.forRoot({
    isGlobal: true,
    load: [...config]
  }), CacheModule, UploadModule, MenuModule, RoleModule, SocketModule, LoginLogModule],
  controllers: [AppController],
  providers: [
    AppService, PrismaService, LoggerService, ConfigService, EmailService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
  

