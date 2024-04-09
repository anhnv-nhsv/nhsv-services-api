import { BaseResponse } from 'src/utils/base-response/base-response';
import { VerifiedOtp } from './verified-otp';

export class VerifiedOtpResponse extends BaseResponse(VerifiedOtp, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      scrt_err_msg: '0',
    },
  ],
}) {}
