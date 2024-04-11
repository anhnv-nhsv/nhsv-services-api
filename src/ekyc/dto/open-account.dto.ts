import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class OpenAccountDto {
  @ApiProperty({
    description: 'Phân loại đầu tư\n\n1: Cá nhân\n\n2: Tổ chức',
    example: '1',
  })
  @Matches('^(1|2)$')
  @IsNotEmpty()
  grp_tp: string;

  @ApiProperty({
    description: 'Số điện thoại',
    example: '0912345678',
  })
  @IsNotEmpty()
  @MaxLength(10, { message: 'Độ dài tối đa của SDT là 10 số' })
  mobile: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@abc.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
