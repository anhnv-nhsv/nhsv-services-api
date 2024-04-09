import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

class EKYCOpenAccountPayloadDto {
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

class EKYCCheckAccountExistPayloadDto {
  @ApiProperty({
    description: 'Số CMND/CCCD',
    example: '0912345678',
  })
  @IsNotEmpty()
  @MinLength(9, { message: 'Độ dài tối thiểu của CMND/CCCD là 9 số' })
  @MaxLength(12, { message: 'Độ dài tối đa của CMND/CCCD là 12 số' })
  idno: string;
}

class EKYCUpdateAccountPayloadDto {
  @ApiProperty({
    description: 'Id tài khoản của khách hàng - lấy ở field os_seq_no của open account',
    example: '6591',
  })
  @IsNotEmpty()
  seq_no: string;

  @ApiProperty({
    description: 'Tên khách hàng ở CMND/CCCD',
    example: 'Nguyễn',
  })
  @IsNotEmpty()
  cust_nm: string;

  @ApiProperty({
    description: 'Số CMND/CCCD',
    example: '689352425793',
  })
  @IsNotEmpty()
  idno: string;

  @ApiProperty({
    description: 'Ngày sinh',
    example: '19990804',
  })
  @IsNotEmpty()
  birth_dt: string;

  @ApiProperty({
    description: 'Giới tính - 1: Nam, 2: Nữ',
    example: '2',
  })
  @IsNotEmpty()
  sex_tp: string;

  @ApiProperty({
    description: 'Ngày cấp CMND/CCCD',
    example: '20210810',
  })
  @IsNotEmpty()
  idno_iss_dt: string;

  @ApiProperty({
    description: 'Người ký cấp CMND/CCCD',
    example: 'CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI',
  })
  @IsNotEmpty()
  idno_iss_orga: string;

  @ApiProperty({
    description: 'Địa chỉ thường trú',
    example: 'Hà Nội',
  })
  @IsNotEmpty()
  home_addr: string;

  @ApiProperty({
    description: 'Địa chỉ liên hệ',
    example: 'Hà Nội',
  })
  @IsNotEmpty()
  conct_addr: string;

  @ApiProperty({
    description: 'chi nhánh gần với vị trí của bạn nhất - lấy ở kết quả của EKY-003 "code_tp": "brch_cd"',
    example: '100',
  })
  @IsNotEmpty()
  brch_cd: string;

  @ApiProperty({
    description: 'Đăng ký mở tài khoản giao dịch ký quỹ - 1:Không, 2:Có',
    example: '2',
  })
  @IsNotEmpty()
  acnt_mrgn_tp: string;

  @ApiProperty({
    description: 'Giao dịch qua internet - Y:Có, N:Không',
    example: 'Y',
  })
  @IsNotEmpty()
  trd_onl_yn: string;

  @ApiProperty({
    description: 'Đăng ký phương thức xác thực - 1: OTP (disable: trd_onl_yn === N), 2: Token',
    example: '1',
  })
  @IsNotEmpty()
  cert_tp: string;

  @ApiProperty({
    description: 'Phương thức nhận thẻ OTP - Y: email (disable: trd_onl_yn === N), N: Chuyển phát nhanh (disable: trd_onl_yn === N)',
    example: 'Y',
  })
  @IsNotEmpty()
  otp_recv_tp: string;

  @ApiProperty({
    description: 'Ứng trước tiền bán chứng khoán - Y: Có, N: Không',
    example: 'Y',
  })
  @IsNotEmpty()
  auto_pia_tp: string;

  @ApiProperty({
    description: 'Phương thức nhận thông báo SMS - 1: SMS cơ bản, 2: SMS nâng cao',
    example: '1',
  })
  @IsNotEmpty()
  sms_tp: string;

  @ApiProperty({
    description: 'Phương thức nhận thông báo Email - Y: Có, N: Không',
    example: 'Y',
  })
  @IsNotEmpty()
  email_yn: string;

  @ApiProperty({
    description: 'Phương thức nhận thông báo App - Y: Có, N: Không <mặc định là N>',
    example: 'Y',
  })
  @IsNotEmpty()
  notif_yn: string;

  @ApiProperty({
    description: 'Mã code ngân hàng 1 - Lấy từ field code của EKY-003 với field code_tp = “bank_cd_off"',
    example: '0101',
  })
  @IsNotEmpty()
  bank_cd_off_1: string;

  @ApiProperty({
    description: 'Số tài khoản ngân hàng 1',
    example: '1012483980',
  })
  @IsNotEmpty()
  bank_acnt_no_1: string;

  @ApiProperty({
    description: 'Tên chủ tài khoản ngân hàng 1',
    example: 'BUI TRANG NGAN',
  })
  @IsNotEmpty()
  bank_acnt_nm_1: string;

  @ApiProperty({
    description: 'Mã code của Chi nhánh ngân hàng 1 - Lấy từ field code của EKY-003 với field code_tp = “bank_brch"',
    example: 'NT07',
  })
  @IsNotEmpty()
  bank_brch_cd_1: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_cd_off_2: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_acnt_no_2: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_acnt_nm_2: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_brch_cd_2: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_cd_off_3: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_acnt_no_3: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_acnt_nm_3: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_brch_cd_3: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_cd_off_4: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_acnt_no_4: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_acnt_nm_4: string;

  @ApiProperty({
    description: 'Not required',
    example: '',
    required: false,
  })
  bank_brch_cd_4: string;

  @ApiProperty({
    description: 'Người giới thiệu - 1: Nhân viên/CTV, 2: Khách hàng, 3: Quảng cáo, 4: Khác (disable nếu có partner)',
    example: '1',
  })
  @IsNotEmpty()
  rcm_emp_no_tp: string;

  @ApiProperty({
    description: 'Id của partner - ctvtimo: Timo, ctvvpb: VPB, woori1: Worri 1, woori2: Worri 2, accesstrade: Accesstrade',
    example: 'bangdn',
  })
  @IsNotEmpty()
  ifno_idno: string;

  @ApiProperty({
    description: 'Lựa chọn mô hình quản lý tài khoản (disable nếu có partner) - Y: Có nhân viên chăm sóc tài khoản, N: Không có',
    example: 'Y',
  })
  @IsNotEmpty()
  mng_emp_yn: string;

  @ApiProperty({
    description: 'Id của partner - ctvtimo: Timo, ctvvpb: VPB, woori1: Worri 1, woori2: Worri 2, accesstrade: Accesstrade',
    example: 'bangdn',
  })
  @IsNotEmpty()
  mng_emp_no: string;

  @ApiProperty({
    description:
      'Tôi không thuộc các trường hợp là công dân Mỹ hoặc đối tượng cư trú tại Mỹ, có nơi sinh/địa chỉ nhận thư hoặc địa chỉ lưu trú/số điện thoại liên lạc/địa chỉ - Y: Không thuộc, N: Có thuộc',
    example: 'Y',
  })
  @IsNotEmpty()
  fatca_yn: string;

  @ApiProperty({
    description: 'Điểm eKYC của VNPT - eKYC chấm',
    example: '99',
  })
  @IsNotEmpty()
  vnpt_point: string;

  @ApiProperty({
    description: 'Thông tin cookie eKYC - lấy cookie với key _aff_sid',
    example: '',
    required: false,
  })
  track_id: string;

  @ApiProperty({
    description: 'mã số thuế',
    example: '038076005737',
  })
  @IsNotEmpty()
  tax_cd: string;

  @ApiProperty({
    description: 'Gửi email hợp đồng mở TK, mặc định là N',
    example: 'N',
  })
  @IsNotEmpty()
  send_email_cntr_yn: string;
}

class EKYCGetAccountInfoPayloadDto {
  @ApiProperty({
    description: 'Số CMND/CCCD',
    example: '0912345678',
  })
  @IsNotEmpty()
  @MinLength(9, { message: 'Độ dài tối thiểu của CMND/CCCD là 9 số' })
  @MaxLength(12, { message: 'Độ dài tối đa của CMND/CCCD là 12 số' })
  idno: string;
}

class EKYCGetBrokerInfoPayloadDto {
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

class EKYCGetBankPayloadDto {
  @ApiProperty({
    description: 'brch_cd: list branch\n\nbank_cd_off: list bank\n\nbank_brch: list chi nhánh của bank',
    example: 'bangdn',
  })
  @IsNotEmpty()
  code_tp: string;

  @ApiProperty({
    description: 'Nếu type=“bank_brch” thì cần truyền thêm input “bank_code” => Giá trị input “bank_code” lấy từ output “code” với type=“ bank_cd_off”',
    example: 'bangdn',
  })
  bank_code: string;
}

export { EKYCOpenAccountPayloadDto, EKYCCheckAccountExistPayloadDto, EKYCUpdateAccountPayloadDto, EKYCGetAccountInfoPayloadDto, EKYCGetBrokerInfoPayloadDto, EKYCGetBankPayloadDto };
