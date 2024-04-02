import { BaseResponse } from 'src/utils/base-response/base-response';
import { LoggedInInfoDto } from './logged-in-info.dto';

export class AuthResponseDto extends BaseResponse(LoggedInInfoDto, {
  description: 'Cấu trúc data trả về',
  example: [
    {
      id: '159b79f3-98dc-4d1b-9472-05a3b02f51bb',
    },
  ],
}) {}
