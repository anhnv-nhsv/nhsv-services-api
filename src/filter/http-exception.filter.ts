import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      error_code: status,
      error_desc: exception.message,
      errors: typeof exception.getResponse() === 'object' ? exception.getResponse()['errors'] : { message: exception.getResponse() },
      data_list: [],
    });
  }
  // catch(exception: unknown, host: ArgumentsHost) {
  //   // In certain situations `httpAdapter` might not be available in the
  //   // constructor method, thus we should resolve it here.
  //   const { httpAdapter } = this.httpAdapterHost;

  //   const ctx = host.switchToHttp();

  //   const httpStatus =
  //     exception instanceof HttpException
  //       ? exception.getStatus()
  //       : HttpStatus.INTERNAL_SERVER_ERROR;

  //   const responseBody = {
  //     error_code: httpStatus,
  //     error_desc:
  //       exception instanceof HttpException
  //         ? exception.message
  //         : 'INTERNAL_SERVER_ERROR',
  //     data_list: [],
  //   };

  //   httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  //   // const ctx = host.switchToHttp();
  //   // const response = ctx.getResponse<Response>();
  //   // const status = exception.getStatus();

  //   // response.status(status).json({
  //   //   error_code: status,
  //   //   error_desc: exception.message,
  //   //   data_list: [],
  //   // });
  // }
}
