import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {  
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { LoggerService } from './logger/logger.service';
import * as path  from 'path';
import { LoggerModule } from './logger/logger.module';
import {LoggerMiddleware} from "./logger/logger.middleware";
import { AuthModule } from './auth/auth.module';
import { ValidateExceptionFilter } from './common/validate.filter';
import {ConfigModule, ConfigService}  from '@nestjs/config'
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
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggerService, ConfigService
  //  {
  //   provide: 'APP_FILTER',
  //   useClass: ValidateExceptionFilter
  //  }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
  

