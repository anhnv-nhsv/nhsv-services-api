import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';
import { AuthResponseDto } from './dto/auth-response.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async loginViaLotte(authLoginDto: AuthRequestDto): Promise<AuthResponseDto> {
    const lotteBaseUrl = this.configService.getOrThrow('auth.lotteBaseUrl', {
      infer: true,
    });
    const lotteApiKey = this.configService.getOrThrow('auth.lotteApiKey', {
      infer: true,
    });
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          '/tsol/apikey/tuxsvc/account/user/verify',
          new URLSearchParams({
            username: authLoginDto.username,
            password: authLoginDto.password,
            useraddr: authLoginDto.useraddr,
            lang_code: authLoginDto.langCode,
          }),
          {
            baseURL: lotteBaseUrl,
            headers: {
              apiKey: lotteApiKey,
              'User-Agent': 'PostmanRuntime/7.37.0',
            },
          },
        )
        .pipe(
          timeout({
            each: 2000,
            with: () => throwError(() => new Error('Timeout cmnr')),
          }),
          catchError((error: AxiosError) => {
            console.log(error);
            return throwError(error);
          }),
        ),
    );
    console.log(data);
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
