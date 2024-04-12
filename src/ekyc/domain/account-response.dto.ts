import { BaseResponseHelper } from 'src/utils/base-response/base-response-helper';
import { CheckAccountExistDto } from '../dto/check-account-exist.dto';
import { GetAccountInfoDto } from '../dto/get-account-info.dto';
import { GetBankDto } from '../dto/get-bank.dto';
import { GetBrokerInfoDto } from '../dto/get-broker-info.dto';
import { OpenAccountDto } from '../dto/open-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

class EKYCOpenAccountResponseDto extends BaseResponseHelper(OpenAccountDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      os_seq_no: '1121',
    },
  ],
}) {}

class EKYCCheckAccountExistResponseDto extends BaseResponseHelper(CheckAccountExistDto, {
  description: 'Cấu trúc data trả về',
  example: [{ scrt_err_msg: 'A' }],
}) {}

class EKYCUpdateAccountResponseDto extends BaseResponseHelper(UpdateAccountDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      scrt_err_msg: 'U',
    },
  ],
}) {}

class EKYCGetAccountInfoResponseDto extends BaseResponseHelper(GetAccountInfoDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      acnt_no: '039C510307',
      cntr_no: '00-00-969-EKYC',
    },
  ],
}) {}

class EKYCGetBrokerInfoResponseDto extends BaseResponseHelper(GetBrokerInfoDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      chk: 'Y',
      code_nm: 'Nguyễn Văn A',
    },
  ],
}) {}

class EKYCGetBankResponseDto extends BaseResponseHelper(GetBankDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      code: '01204001',
      code_nm: 'NHNOVAPTNT-HOI SO CHINH - HA NOI',
    },
    {
      code: '01204002',
      code_nm: 'NHNOVAPTNT-SO GIAO DICH - HA NOI',
    },
  ],
}) {}

export { EKYCOpenAccountResponseDto, EKYCCheckAccountExistResponseDto, EKYCUpdateAccountResponseDto, EKYCGetAccountInfoResponseDto, EKYCGetBrokerInfoResponseDto, EKYCGetBankResponseDto };
