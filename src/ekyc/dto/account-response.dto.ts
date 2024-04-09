import { BaseResponse } from 'src/utils/base-response/base-response';
import { CheckAccountExistDto, GetAccountInfoDto, GetBankDto, GetBrokerInfoDto, OpenAccountDto, UpdateAccountDto } from './ekyc-account.dto';

class EKYCOpenAccountResponseDto extends BaseResponse(OpenAccountDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      os_seq_no: '1121',
    },
  ],
}) {}

class EKYCCheckAccountExistResponseDto extends BaseResponse(CheckAccountExistDto, {
  description: 'Cấu trúc data trả về',
  example: [{ scrt_err_msg: 'A' }],
}) {}

class EKYCUpdateAccountResponseDto extends BaseResponse(UpdateAccountDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      scrt_err_msg: 'U',
    },
  ],
}) {}

class EKYCGetAccountInfoResponseDto extends BaseResponse(GetAccountInfoDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      acnt_no: '039C510307',
      cntr_no: '00-00-969-EKYC',
    },
  ],
}) {}

class EKYCGetBrokerInfoResponseDto extends BaseResponse(GetBrokerInfoDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      chk: 'Y',
      code_nm: 'Nguyễn Văn A',
    },
  ],
}) {}

class EKYCGetBankResponseDto extends BaseResponse(GetBankDto, {
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
