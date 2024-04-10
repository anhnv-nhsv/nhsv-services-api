import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { EKYCOpenAccountResponseDto } from './dto/account-response.dto';
import { OpenAccountDto } from './dto/ekyc-account.dto';

@Injectable()
export class EkycService {
  constructor(private httpService: HttpService) {}

  async openAccount(
    openAccountDto: OpenAccountDto,
  ): Promise<EKYCOpenAccountResponseDto> {
    // const { data } = await firstValueFrom(
    //   this.httpService.get('/wines/reds').pipe(
    //     timeout({
    //       each: 2000,
    //       with: () => throwError(() => new Error()),
    //     }),
    //     catchError((error: AxiosError) => {
    //       console.log(error);
    //     }),
    //   ),
    // );
    console.log(openAccountPayload);
    return {
      error_code: '',
      error_desc: '',
      success: false,
      data_list: [],
    };
  }

  // async checkAccountExist(checkAccountExistPayload: EKYCCheckAccountExistPayloadDto): Promise<EKYCCheckAccountExistResponseDto> {
  //   console.log(checkAccountExistPayload);
  //   return {
  //     error_code: '',
  //     error_desc: '',
  //     success: false,
  //     data_list: [],
  //   };
  // }

  // async updateAccount(updateAccountPayload: EKYCUpdateAccountPayloadDto): Promise<EKYCUpdateAccountResponseDto> {
  //   console.log(updateAccountPayload);
  //   return {
  //     error_code: '',
  //     error_desc: '',
  //     success: false,
  //     data_list: [],
  //   };
  // }

  // async getAccountInfo(getAccountInfoPayload: EKYCGetAccountInfoPayloadDto): Promise<EKYCGetAccountInfoResponseDto> {
  //   console.log(getAccountInfoPayload);
  //   return {
  //     error_code: '',
  //     error_desc: '',
  //     success: false,
  //     data_list: [],
  //   };
  // }

  // async getBrokerInfo(getBrokerInfoPayload: EKYCGetBrokerInfoPayloadDto): Promise<EKYCGetBrokerInfoResponseDto> {
  //   console.log(getBrokerInfoPayload);
  //   return {
  //     error_code: '',
  //     error_desc: '',
  //     success: false,
  //     data_list: [],
  //   };
  // }

  // async getBankInfo(bankInfoPayload: EKYCGetBankPayloadDto): Promise<EKYCGetBankResponseDto> {
  //   console.log(bankInfoPayload);
  //   return {
  //     error_code: '',
  //     error_desc: '',
  //     success: false,
  //     data_list: [],
  //   };
  // }

  // async getVSDStatus(bankInfoPayload: EKYCGetBankPayloadDto): Promise<EKYCGetBankResponseDto> {
  //   console.log(bankInfoPayload);
  //   return {
  //     error_code: '',
  //     error_desc: '',
  //     success: false,
  //     data_list: [],
  //   };
  // }
}
