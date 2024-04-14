import { ApiProperty } from '@nestjs/swagger';

export class GetBrokerInfo {
  @ApiProperty({
    description: 'Có phải nhân viên hay không. Y: Là nhân viên || N: Không phải là nhân viên',
    example: 'Y',
  })
  chk?: string;

  @ApiProperty({
    description: 'Họ tên nhân viên. Nếu chk = “Y” thì mới có kết quả của code_nm',
    example: 'Nguyen Van A',
  })
  code_nm?: string;
}
