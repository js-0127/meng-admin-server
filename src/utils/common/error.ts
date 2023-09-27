import {HttpException, HttpStatus} from '@nestjs/common'


export class R {
  static error(message: string) {
    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  static validateError(message: string) {
    return new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  static unauthorizedError(message: string) {
    return new HttpException(message, HttpStatus.UNAUTHORIZED);
  }

  static forbiddenError(message: string) {
    return new HttpException(message, HttpStatus.FORBIDDEN);
  }
}
