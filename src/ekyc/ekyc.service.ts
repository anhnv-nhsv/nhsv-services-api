import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import {
  EKYCCheckAccountExistResponseDto,
  EKYCGetAccountInfoResponseDto,
  EKYCGetBankResponseDto,
  EKYCGetBrokerInfoResponseDto,
  EKYCOpenAccountResponseDto,
  EKYCUpdateAccountResponseDto,
} from './domain/account-response.dto';
import { OpenAccountDto } from './dto/open-account.dto';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeqTrackingEntity } from './entities/seq-tracking.entity';
import { plainToClass } from 'class-transformer';
import { OpenAccount } from './domain/open-account';
import { CheckAccountExistDto } from './dto/check-account-exist.dto';
import { CheckAccountExist } from './domain/check-account-exist';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateAccount } from './domain/update-account';
import { GetAccountInfoDto } from './dto/get-account-info.dto';
import { GetAccountInfo } from './domain/get-account-info';
import { GetBrokerInfo } from './domain/get-broker-info';
import { GetBankDto } from './dto/get-bank.dto';
import { CustomerEntity } from './entities/customer.entity';
import { PartnerEntity } from './entities/partner.entity';
import { AxiosError } from 'axios';
import { firstValueFrom, timeout, throwError, catchError } from 'rxjs';
import { LotteUrlConst } from 'src/utils/constant/lotte-url.const';
import { CustomErrorMessageConst } from 'src/utils/constant/custom-error-message.const';

@Injectable()
export class EkycService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService<AllConfigType>,
    @InjectRepository(PartnerEntity)
    private partnerRepository: Repository<PartnerEntity>,
    @InjectRepository(SeqTrackingEntity)
    private seqTrackingRepository: Repository<SeqTrackingEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async openAccount(openAccountDto: OpenAccountDto): Promise<EKYCOpenAccountResponseDto> {
    const counter = await this.partnerRepository.findAndCount({
      select: {
        id: true,
      },
      where: {
        id: +openAccountDto.source,
      },
    });
    const resp = new EKYCOpenAccountResponseDto();
    if (counter[1] === 1) {
      const data = await this.callLotteService('post', LotteUrlConst.ekyc.openAccount, openAccountDto);
      if (data.hasOwnProperty('error_code')) {
        // to-do: custom error code & error desc
        (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
        if (data.data_list.length > 0 && data.error_code === '0000') {
          const seqInfos = plainToClass(OpenAccount, data.data_list) as OpenAccount[];
          const seqTracking = new SeqTrackingEntity();
          seqTracking.osSeqNo = seqInfos[0].os_seq_no ? seqInfos[0].os_seq_no : '';
          seqTracking.partnerId = +openAccountDto.source;
          this.seqTrackingRepository.save(seqTracking);

          const customer = new CustomerEntity();
          customer.mobile = openAccountDto.mobile;
          customer.email = openAccountDto.email;
          customer.osSeqNo = seqInfos[0].os_seq_no ? seqInfos[0].os_seq_no : '';
          this.customerRepository.save(customer);

          resp.data_list = seqInfos;
        }
      }
    } else {
      throw new HttpException(CustomErrorMessageConst.ekyc.partnerNotFound, HttpStatus.NOT_FOUND);
    }
    return resp;
  }

  async checkAccountExist(checkAccountExistDto: CheckAccountExistDto): Promise<EKYCCheckAccountExistResponseDto> {
    const data = await this.callLotteService('post', LotteUrlConst.ekyc.checkAccountExist, checkAccountExistDto);
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
    const data = await this.callLotteService('post', LotteUrlConst.ekyc.updateAccount, updateAccountPayload);
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
    const data = await this.callLotteService('post', LotteUrlConst.ekyc.getAccountInfo, getAccountInfoPayload);
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
    const data = await this.callLotteService('post', LotteUrlConst.ekyc.getBrokerInfo, getBrokerInfoPayload);
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

  private async callLotteService(method: string, url: string, payload: any) {
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
}
