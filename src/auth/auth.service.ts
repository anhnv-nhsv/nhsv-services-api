import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  public loginViaLotte(authLoginDto: AuthLoginDto) {
    this.getTokensData({
      username: authLoginDto.username,
      password: authLoginDto.password,
      useraddr: authLoginDto.useraddr,
    });
    return { asd: 'loginViaLotte' };
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
    console.log(token);
    return {
      token,
      tokenExpires,
    };
  }
}
