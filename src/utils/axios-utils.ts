import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, timeout, throwError, catchError } from 'rxjs';

export async function callLotteService(method: string, url: string, payload: any) {
  const { data }: any = await firstValueFrom(
    this.httpService
      .request({
        method: method,
        url: url,
        data: payload,
      })
      .pipe(
        timeout({
          each: 5000,
          with: () => throwError(() => new Error('Login timeout')),
        }),
        catchError((error: AxiosError) => {
          console.log(error);
          throw new HttpException(error.response?.data ? error.response.data['error_desc'] : error.response?.statusText, error.response?.status as number);
        }),
      ),
  );
  return data;
}
