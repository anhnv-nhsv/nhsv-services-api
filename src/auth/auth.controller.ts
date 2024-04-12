import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './domain/auth/auth-response';
import { VerifiedOtpResponse } from './domain/verify-otp/verified-otp-response';
import { VerifyOTPDto } from './dto/verify-otp.dto';

@ApiTags('Authentication and OTP')
@ApiResponse({
  status: 401,
  description: '- No API key found in request.\n\n- Unauthorized',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthResponse })
  public loginViaLotte(@Body() authLoginRequestDto: LoginDto): Promise<AuthResponse> {
    return this.authService.loginViaLotte(authLoginRequestDto);
  }

  @Post('otp/send')
  public sendOTP() {}

  @Post('otp/verify')
  @ApiOkResponse({ type: VerifiedOtpResponse })
  public verifyOTP(@Body() otpVerifyRequestDto: VerifyOTPDto): Promise<VerifiedOtpResponse> {
    return this.authService.verifyOTP(otpVerifyRequestDto);
  }
}
