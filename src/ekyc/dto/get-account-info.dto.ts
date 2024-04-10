import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class GetAccountInfoDto {
  @ApiProperty({
    description: 'Số CMND/CCCD',
    example: '0912345678',
  })
  @IsNotEmpty()
  @MinLength(9, { message: 'Độ dài tối thiểu của CMND/CCCD là 9 số' })
  @MaxLength(12, { message: 'Độ dài tối đa của CMND/CCCD là 12 số' })
  idno: string;
}
