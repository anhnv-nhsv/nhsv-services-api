import { ApiProperty } from '@nestjs/swagger';

class OpenAccountDto {
  @ApiProperty({ description: 'Id của account mở tài khoản', example: '1102' })
  os_seq_no: string;
}

class CheckAccountExistDto {
  @ApiProperty({
    description: 'Message thực hiện thành công (“A”: chưa tồn tại ID)',
    example: 'A',
  })
  scrt_err_msg: string;
}

class UpdateAccountDto {
  @ApiProperty({
    description: 'Message thực hiện thành công (“U”: update thành công)',
    example: 'A',
  })
  scrt_err_msg: string;
}

class GetAccountInfoDto {
  @ApiProperty({
    description: 'Số tài khoản',
    example: '039C510307',
  })
  acnt_no: string;

  @ApiProperty({
    description: 'Số hợp đồng',
    example: '00-00-969-EKYC',
  })
  cntr_no: string;
}

class GetBrokerInfoDto {
  @ApiProperty({
    description: 'Có phải nhân viên hay không\n\nY: Là nhân viên\n\nN: Không phải là nhân viên',
    example: 'Y',
  })
  chk: string;

  @ApiProperty({
    description: 'Họ tên nhân viên. Nếu chk = “Y” thì mới có',
    example: 'Nguyễn Văn A',
  })
  code_nm: string;
}

class GetBankDto {
  @ApiProperty({
    description: 'Mã ngân hàng',
    example: '12736',
  })
  code: string;

  @ApiProperty({
    description: 'Tên ngân hàng || Tên chi nhánh',
    example: 'BIDV',
  })
  code_nm: string;
}

export { OpenAccountDto, CheckAccountExistDto, UpdateAccountDto, GetAccountInfoDto, GetBrokerInfoDto, GetBankDto };
