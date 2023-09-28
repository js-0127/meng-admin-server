import {
    ArgumentMetadata,
    BadRequestException,
    HttpStatus,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { validate } from 'class-validator';
  @Injectable()
  export class ValidatePipe implements PipeTransform {
 
    async transform(value: any, metadata: ArgumentMetadata) {
      const obj = plainToInstance(metadata.metatype, value);
      const errors = await validate(obj);
      if (errors.length) {
        const messages = errors.map((error) => {
          return { field: error.property, message: Object.values(error.constraints)[0] }
        })
        const message = {
          code: HttpStatus.BAD_REQUEST,
          messages,
          error: 'bad request',
        }
        throw new BadRequestException(
          message
        )
      }  
      return value
    }
   
  }