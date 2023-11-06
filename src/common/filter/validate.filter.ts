import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpCode, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { LoggerService } from 'src/services/logger.service'


@Catch(HttpException)
export class ValidateExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService){}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    //自定义异常处理
   
    this.loggerService.error(JSON.stringify(exception.getResponse())) 
    
    if (exception instanceof BadRequestException) {
      
      return response.json(exception.getResponse())
    // throw new HttpException(exception.getResponse(), HttpStatus.BAD_REQUEST, )
    }

    return response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}