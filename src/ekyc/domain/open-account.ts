import { ApiProperty } from '@nestjs/swagger';

export class OpenAccount {
  @ApiProperty({
    description: 'Id của account mở tài khoản',
    example: '1234',
  })
  os_seq_no?: string;
}
