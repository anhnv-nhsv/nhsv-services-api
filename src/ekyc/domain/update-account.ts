import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccount {
  @ApiProperty({
    description: 'Message thực hiện thành công',
    example: 'A',
  })
  scrt_err_msg?: string;
}
