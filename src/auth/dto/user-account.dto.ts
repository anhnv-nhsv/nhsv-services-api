import { ApiProperty } from '@nestjs/swagger';
import { AccountBankDto } from './account-bank.dto';

export class UserAccountDto {
  @ApiProperty({ example: '039C11001500', description: 'Số TK' })
  acnt_no: string;

  @ApiProperty({
    example: 'aaL0q43ITAseA',
    description: 'Mật khẩu TK đã mã hóa',
  })
  acnt_scrt: string;

  @ApiProperty({ example: 'I', description: 'Loại TK' })
  acnt_tp: string;

  @ApiProperty({ example: 'Nguyễn', description: 'Tên TK' })
  acnt_nm: string;

  @ApiProperty({ example: '99999999', description: 'Giá trị next_key' })
  next_key: string;

  @ApiProperty({
    example: 'Danh sách bank của TK',
    description: 'Giá trị next_key',
  })
  bankInfo: AccountBankDto[];
}
