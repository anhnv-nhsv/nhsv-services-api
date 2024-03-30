import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async loginViaLotte(authLoginDto: AuthRequestDto): Promise<AuthResponseDto> {
    this.getTokensData({
      username: authLoginDto.username,
      password: authLoginDto.password,
      useraddr: authLoginDto.useraddr,
    });
    const auth = new AuthResponseDto();
    (auth.error_code = '0000'), (auth.error_desc = 'asd');
    auth.data_list = [
      {
        username: authLoginDto.username,
        password: authLoginDto.password,
        useraddr: authLoginDto.useraddr,
      },
    ];
    console.log(auth);
    return auth;
  }

  private async getTokensData(data: {
    username: string;
    password: string;
    useraddr: string;
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const token = await this.jwtService.signAsync(
      {
        sub: data.username,
      },
      {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      },
    );
    return {
      token,
      tokenExpires,
    };
  }
}
