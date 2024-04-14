import { BaseResponseHelper } from 'src/utils/base-response/base-response-helper';
import { CheckAccountExist } from './check-account-exist';
import { GetAccountInfo } from './get-account-info';
import { GetBank } from './get-bank';
import { GetBrokerInfo } from './get-broker-info';
import { OpenAccount } from './open-account';
import { UpdateAccount } from './update-account';

class EKYCOpenAccountResponseDto extends BaseResponseHelper(OpenAccount, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      os_seq_no: '1121',
    },
  ],
}) {}

class EKYCCheckAccountExistResponseDto extends BaseResponseHelper(CheckAccountExist, {
  description: 'Cấu trúc data trả về',
  example: [{ scrt_err_msg: 'A' }],
}) {}

class EKYCUpdateAccountResponseDto extends BaseResponseHelper(UpdateAccount, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      scrt_err_msg: 'U',
    },
  ],
}) {}

class EKYCGetAccountInfoResponseDto extends BaseResponseHelper(GetAccountInfo, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      acnt_no: '039C510307',
      cntr_no: '00-00-969-EKYC',
    },
  ],
}) {}

class EKYCGetBrokerInfoResponseDto extends BaseResponseHelper(GetBrokerInfo, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      chk: 'Y',
      code_nm: 'Nguyễn Văn A',
    },
  ],
}) {}

class EKYCGetBankResponseDto extends BaseResponseHelper(GetBank, {
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
