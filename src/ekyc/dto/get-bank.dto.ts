import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetBankDto {
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
