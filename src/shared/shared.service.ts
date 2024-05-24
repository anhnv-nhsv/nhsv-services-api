import {HttpException, Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";
import {AxiosError, AxiosRequestConfig} from "axios/index";
import {PinoLogger} from "nestjs-pino";

@Injectable()
export class SharedService {
  constructor(
    private httpService: HttpService,
  ) {
  }

  async callLotteService(config: AxiosRequestConfig) {
    const { data }: any = await firstValueFrom(
      this.httpService
        .request(config)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            // this.logger.error(error.response?.data);
            throw new HttpException(error.response?.data ? error.response.data['error_desc'] : error.response?.statusText, error.response?.status as number);
          }),
        ),
    );
    return data;
  }
}
