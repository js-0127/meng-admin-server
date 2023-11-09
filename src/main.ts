import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.setGlobalPrefix('api')
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  const config = new DocumentBuilder()
  .setTitle('Meng Admin') 
  .setDescription('Meng Admin的后台接口')
  .setVersion('1.0')
  .addTag('meng')
  .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('swagger', app, document);
 await app.listen(3000);
}
bootstrap();
