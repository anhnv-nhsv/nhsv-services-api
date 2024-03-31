import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
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
}
