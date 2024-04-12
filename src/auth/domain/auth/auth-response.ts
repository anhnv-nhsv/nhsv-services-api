import { BaseResponseHelper } from 'src/utils/base-response/base-response-helper';
import { LoggedInInfo } from './logged-in-info';

export class AuthResponse extends BaseResponseHelper(LoggedInInfo, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      id: '159b79f3-98dc-4d1b-9472-05a3b02f51bb',
    },
  ],
}) {}
