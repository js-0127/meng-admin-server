import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {  
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserModule } from './user/user.module';
import { LoggerService } from './logger/logger.service';
import * as path  from 'path';
import { LoggerModule } from './logger/logger.module';
import {LoggerMiddleware} from "./logger/logger.middleware";
import { AuthModule } from './auth/auth.module';
import { ValidateExceptionFilter } from './common/filter/validate.filter';
import {ConfigModule, ConfigService}  from '@nestjs/config'
import { CacheModule } from './cache/cache.module';
import { AuthInterceptor } from './common/interceptor/auth.interceptor';
import { UploadModule } from './upload/upload.module';
import { EmailService } from './services/mail.service';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { SocketModule } from './socket/socket.module';
@Module({
  imports: [UserModule, LoggerModule, I18nModule.forRoot({
    fallbackLanguage: 'zh-CN',
    loaderOptions: {
      path: path.join(__dirname, '/i18n/'),
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
    ],
  }), AuthModule, ConfigModule.forRoot({
    isGlobal: true
  }), CacheModule, UploadModule, MenuModule, RoleModule, SocketModule],
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
  

