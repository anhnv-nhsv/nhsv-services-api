import { ApiProperty } from '@nestjs/swagger';

export class AccountBankDto {
  @ApiProperty({ example: '9999', description: 'Mã Ngân hàng' })
  bank_code: string;

  @ApiProperty({ example: 'NHSV', description: 'Tên Ngân hàng' })
  bank_name: string;
}
