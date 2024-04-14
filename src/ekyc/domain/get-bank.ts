import { ApiProperty } from '@nestjs/swagger';

export class GetBank {
  @ApiProperty({
    description: 'Mã ngân hàng || Mã chi nhánh',
    example: '01204001',
  })
  code: string;

  @ApiProperty({
    description: 'Tên ngân hàng || Tên chi nhánh',
    example: 'NHNOVAPTNT-HOI SO CHINH - HA NOI',
  })
  code_nm: string;
}
