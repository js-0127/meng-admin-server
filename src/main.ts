import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { ValidateExceptionFilter } from './common/filter/validate.filter';
import { AuthInterceptor } from './common/interceptor/auth.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

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
