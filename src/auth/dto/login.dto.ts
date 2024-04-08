import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '039c110031', description: 'Username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '0WLHT204', description: 'Password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '127.0.0.1', description: 'User IP' })
  @IsNotEmpty()
  useraddr: string;

  @ApiProperty({ example: 'V', description: 'Ngôn ngữ response' })
  langCode: string;
}
