import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './domain/auth-response';

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
  public loginViaLotte(
    @Body() authLoginRequestDto: LoginDto,
  ): Promise<AuthResponse> {
    return this.authService.loginViaLotte(authLoginRequestDto);
  }

  @Post('otp/send')
  public sendOTP() {}

  @Post('otp/verify')
  public verifyOTP() {}
}
