import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { EKYCOpenAccountResponseDto } from './dto/account-response.dto';
import { AxiosError } from 'axios';
import { firstValueFrom, timeout, throwError, catchError } from 'rxjs';
import { OpenAccountDto } from './dto/open-account.dto';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeqTrackingEntity } from './entities/seq-tracking.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EkycService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService<AllConfigType>,
    @InjectRepository(SeqTrackingEntity)
    private seqTrackingRepository: Repository<SeqTrackingEntity>,
  ) {}

  async openAccount(openAccountDto: OpenAccountDto): Promise<EKYCOpenAccountResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.post('/tsol/apikey/tuxsvc/ekyc/create-account', openAccountDto).pipe(
        timeout({
          each: 5000,
          with: () => throwError(() => new Error('API timeout')),
        }),
        catchError((error: AxiosError) => {
          console.log(error);
          throw new HttpException(error.response?.data ? error.response.data['error_desc'] : error.response?.statusText, error.response?.status as number);
        }),
      ),
    );
    const seqInfo = plainToClass(EKYCOpenAccountResponseDto, data);
    const seqTracking = new SeqTrackingEntity();
    console.log(seqInfo);
    seqTracking.osSeqNo = seqInfo.data_list[0].os_seq_no;
    seqTracking.partnerId = +openAccountDto.source;
    this.seqTrackingRepository.save(seqTracking);
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
