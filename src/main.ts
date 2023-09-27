import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { ValidatePipe } from './common/classValidate.pipe';
import { ValidateExceptionFilter } from './common/validate.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidatePipe())

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
