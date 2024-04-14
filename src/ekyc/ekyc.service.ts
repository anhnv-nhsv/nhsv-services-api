import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { EKYCCheckAccountExistResponseDto, EKYCGetAccountInfoResponseDto, EKYCGetBankResponseDto, EKYCGetBrokerInfoResponseDto, EKYCOpenAccountResponseDto, EKYCUpdateAccountResponseDto } from './domain/account-response.dto';
import { AxiosError } from 'axios';
import { firstValueFrom, timeout, throwError, catchError } from 'rxjs';
import { OpenAccountDto } from './dto/open-account.dto';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeqTrackingEntity } from './entities/seq-tracking.entity';
import { plainToClass } from 'class-transformer';
import { callLotteService } from 'src/utils/axios-utils';
import { OpenAccount } from './domain/open-account';
import { CheckAccountExistDto } from './dto/check-account-exist.dto';
import { CheckAccountExist } from './domain/check-account-exist';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateAccount } from './domain/update-account';
import { GetAccountInfoDto } from './dto/get-account-info.dto';
import { GetAccountInfo } from './domain/get-account-info';
import { GetBrokerInfo } from './domain/get-broker-info';
import { GetBankDto } from './dto/get-bank.dto';

@Injectable()
export class EkycService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService<AllConfigType>,
    @InjectRepository(SeqTrackingEntity)
    private seqTrackingRepository: Repository<SeqTrackingEntity>,
  ) {}

  async openAccount(openAccountDto: OpenAccountDto): Promise<EKYCOpenAccountResponseDto> {
    const data = await callLotteService('post', '/tsol/apikey/tuxsvc/ekyc/create-account', openAccountDto);
    const seqInfos = plainToClass(OpenAccount, data.data_list) as OpenAccount[];

    const resp = new EKYCOpenAccountResponseDto();
    if (data.hasOwnProperty('error_code')) {
      // to-do: custom error code & error desc
      (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
      if (data.data_list.length > 0) {
        const seqTracking = new SeqTrackingEntity();
        seqTracking.osSeqNo = seqInfos[0].os_seq_no ? seqInfos[0].os_seq_no : '';
        seqTracking.partnerId = +openAccountDto.source;
        this.seqTrackingRepository.save(seqTracking);
        resp.data_list = seqInfos;
      }
    }
    return resp;
  }

  async checkAccountExist(checkAccountExistDto: CheckAccountExistDto): Promise<EKYCCheckAccountExistResponseDto> {
    const data = await callLotteService('post', '/tsol/apikey/tuxsvc/ekyc/create-account', checkAccountExistDto);
    const checkExist = plainToClass(CheckAccountExist, data.data_list) as CheckAccountExist[];

    const resp = new EKYCCheckAccountExistResponseDto();
    if (data.hasOwnProperty('error_code')) {
      // to-do: custom error code & error desc
      (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
      if (data.data_list.length > 0) {
        resp.data_list = checkExist;
      }
    }
    return resp;
  }

  async updateAccount(updateAccountPayload: UpdateAccountDto): Promise<EKYCUpdateAccountResponseDto> {
    const data = await callLotteService('post', '/tsol/apikey/tuxsvc/ekyc/create-account', updateAccountPayload);
    const updatedAcc = plainToClass(UpdateAccount, data.data_list) as UpdateAccount[];

    const resp = new EKYCUpdateAccountResponseDto();
    if (data.hasOwnProperty('error_code')) {
      // to-do: custom error code & error desc
      (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
      if (data.data_list.length > 0) {
        resp.data_list = updatedAcc;
      }
    }
    return resp;
  }

  async getAccountInfo(getAccountInfoPayload: GetAccountInfoDto): Promise<EKYCGetAccountInfoResponseDto> {
    const data = await callLotteService('post', '/tsol/apikey/tuxsvc/ekyc/create-account', getAccountInfoPayload);
    const updatedAcc = plainToClass(GetAccountInfo, data.data_list) as GetAccountInfo[];

    const resp = new EKYCGetAccountInfoResponseDto();
    if (data.hasOwnProperty('error_code')) {
      // to-do: custom error code & error desc
      (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
      if (data.data_list.length > 0) {
        resp.data_list = updatedAcc;
      }
    }
    return resp;
  }

  async getBrokerInfo(getBrokerInfoPayload: GetBrokerInfo): Promise<EKYCGetBrokerInfoResponseDto> {
    const data = await callLotteService('post', '/tsol/apikey/tuxsvc/ekyc/create-account', getBrokerInfoPayload);
    const updatedAcc = plainToClass(GetBrokerInfo, data.data_list) as GetBrokerInfo[];

    const resp = new EKYCGetBrokerInfoResponseDto();
    if (data.hasOwnProperty('error_code')) {
      // to-do: custom error code & error desc
      (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
      if (data.data_list.length > 0) {
        resp.data_list = updatedAcc;
      }
    }
    return resp;
  }

  async getBankInfo(bankInfoPayload: GetBankDto): Promise<EKYCGetBankResponseDto> {
    console.log(bankInfoPayload);
    return {
      error_code: '',
      error_desc: '',
      success: false,
      data_list: [],
    };
  }

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
