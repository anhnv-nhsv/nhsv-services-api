import { BaseResponseHelper } from 'src/utils/base-response/base-response-helper';
import { VerifiedOtp } from './verified-otp';

export class VerifiedOtpResponse extends BaseResponseHelper(VerifiedOtp, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      scrt_err_msg: '0',
    },
  ],
}) {}
