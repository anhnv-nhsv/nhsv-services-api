import { ApiProperty } from '@nestjs/swagger';

export class GetAccountInfo {
  @ApiProperty({
    description: 'Số tài khoản',
    example: '039C510307',
  })
  acnt_no?: string;

  @ApiProperty({
    description: 'Số hợp đồng',
    example: '00-00-969-EKYC',
  })
  cntr_no?: string;
}
