import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class GetBrokerInfoDto {
  @ApiProperty({
    description: 'Mã nhân viên',
    example: 'bangdn',
  })
  @IsNotEmpty()
  emp_no: string;

  @ApiProperty({
    description: `Mã chi nhánh. Nếu muốn tra cứu ALL thì truyền '%'`,
    example: '100',
  })
  brch_cd: string;

  @ApiProperty({
    description: 'Có phải nhân viên nghiệp vụ hay không Y/N',
    example: 'Y',
  })
  @Matches('^(Y|N)$')
  biz_yn: string;
}
