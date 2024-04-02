import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Authentication and OTP')
@ApiResponse({
  status: 401,
  description: '- No API key found in request.\n\n- Unauthorized',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthResponseDto })
  public loginViaLotte(
    @Body() authLoginRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.loginViaLotte(authLoginRequestDto);
  }

  @Post('otp/send')
  public sendOTP() {}

  @Post('otp/verify')
  public verifyOTP() {}
}
