import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      error_code: httpStatus,
      error_desc:
        exception instanceof HttpException
          ? exception.message
          : 'INTERNAL_SERVER_ERROR',
      data_list: [],
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    // const status = exception.getStatus();

    // response.status(status).json({
    //   error_code: status,
    //   error_desc: exception.message,
    //   data_list: [],
    // });
  }
}
