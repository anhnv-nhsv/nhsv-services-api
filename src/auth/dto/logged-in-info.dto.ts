import { ApiProperty } from '@nestjs/swagger';
import { UserAccountDto } from './user-account.dto';

export class LoggedInInfoDto {
  @ApiProperty({ example: '039c110015', description: 'Login ID' })
  login_id?: string;

  @ApiProperty({ example: '89275923509', description: 'Số CCCD' })
  id_no?: string;

  @ApiProperty({ example: 'Nguyễn', description: 'Tên Tài khoản' })
  user_name?: string;

  @ApiProperty({ example: 'aaSjR/f97I2c2', description: 'Mật khẩu đã mã hóa' })
  sec_pwd?: string;

  @ApiProperty({ example: 'true', description: 'Trạng thái tồn tại' })
  is_exist?: string;

  @ApiProperty({ example: '0A', description: 'Phân loại tài khoản' })
  hts_level?: string;

  @ApiProperty({ example: '100', description: 'Chi nhánh quản lí tài khoản' })
  dept_code0?: string;

  @ApiProperty({ example: '100', description: 'Chi nhánh quản lí tài khoản' })
  dept_code1?: string;

  @ApiProperty({ example: '00', description: 'Mã Chi nhánh uỷ quyền' })
  dept_code2?: string;

  @ApiProperty({ example: '000', description: 'Mã chi nhánh uỷ quyền' })
  agc_no?: string;

  @ApiProperty({ example: '0', description: 'Số lần nhập sai OTP' })
  err_cnt?: string;

  @ApiProperty({ example: 'Y', description: 'Trạng thái OTP' })
  otp_stat?: string;

  @ApiProperty({
    example: '19',
    description: 'Thông tin vị trí chỉ số OTP trên bảng ma trận OTP',
  })
  otp_index?: string;

  @ApiProperty({
    example: 'zMn3OPHPu3BFc',
    description:
      'Giá trị đã mã hóa của Số OTP tại chỉ số otp_index trên bảng ma trận OTP.',
  })
  otp_pass?: string;

  @ApiProperty({
    example: '',
    description: 'Token để lấy OTP từ socket',
  })
  otp_event?: string;

  @ApiProperty({ example: ' ', description: 'Trạng thái S-OTP' })
  sotp_stat?: string;

  @ApiProperty({
    example: ' ',
    description:
      'Khóa tạo mã S-OTP. Sử dụng để tạo mã S- OTP, lưu ý mã S-OTP được tạo ra sẽ có hiệu lực trong 60s',
  })
  sotp_sec?: string;

  @ApiProperty({
    example: [],
    description: 'Danh sách tài khoản của user',
  })
  accounts?: UserAccountDto[];
}
