import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty({ example: '039c110031' })
  username: string;

  @ApiProperty({ example: '0WLHT204' })
  password: string;

  @ApiProperty({ example: '127.0.0.1' })
  useraddr: string;
}
