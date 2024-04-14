import { ApiProperty } from '@nestjs/swagger';

export class CheckAccountExist {
  @ApiProperty({
    description: 'Message thực hiện thành công',
    example: 'A',
  })
  scrt_err_msg?: string;
}
