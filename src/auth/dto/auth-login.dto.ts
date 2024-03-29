import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: '039c110031' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '0WLHT204' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '127.0.0.1' })
  @IsNotEmpty()
  useraddr: string;
}
