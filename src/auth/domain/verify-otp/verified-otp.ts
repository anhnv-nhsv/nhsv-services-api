import { ApiProperty } from '@nestjs/swagger';

export class VerifiedOtp {
  @ApiProperty({ example: '0', description: 'Verify message' })
  scrt_err_msg?: string;

  @ApiProperty({ example: 'JWT token', description: 'Access token' })
  sid?: string;
}