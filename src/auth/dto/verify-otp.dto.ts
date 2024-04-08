import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyOTPDto {
  @ApiProperty({ example: '039c110031', description: 'Số tài khoản' })
  @IsNotEmpty()
  acntNo: string;

  @ApiProperty({ example: '1234', description: 'Giá trị OTP' })
  @IsNotEmpty()
  otpVal: string;

  @ApiProperty({ example: 'ghIWtbfK', description: 'Giá trị OTP đã mã hoá' })
  @IsNotEmpty()
  otpEnc: string;

  @ApiProperty({ example: '12', description: 'Số OTP trên thẻ ma trận' })
  @IsNotEmpty()
  otpInd: string;
}
