import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { validate } from 'class-validator';
import { R } from 'src/utils/common/error';
  @Injectable()
  export class ValidatePipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
      const obj = plainToInstance(metadata.metatype, value);
      const errors = await validate(obj,{always: true});
      if (errors.length) {
       R.error('表单验证错误')
      }
      return value;
    }
  }