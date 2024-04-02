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
import { OtpVerifyRequestDto } from './dto/otp-verify-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  private lotteBaseUrl = this.configService.getOrThrow('auth.lotteBaseUrl', {
    infer: true,
  });
  private lotteApiKey = this.configService.getOrThrow('auth.lotteApiKey', {
    infer: true,
  });

  async loginViaLotte(authLoginDto: AuthRequestDto): Promise<AuthResponseDto> {
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
            baseURL: this.lotteBaseUrl,
            headers: {
              apiKey: this.lotteApiKey,
              'User-Agent': 'PostmanRuntime/7.37.0',
            },
          },
        )
        .pipe(
          timeout({
            each: 2000,
            with: () => throwError(() => new Error('Verify user timeout')),
          }),
          catchError((error: AxiosError) => {
            console.log(error);
            return throwError(error);
          }),
        ),
    );
    // set data to response
    const { token } = this.getTokensData({ username: data.user_name });
    const auth = new AuthResponseDto();
    (auth.error_code = '0000'), (auth.error_desc = 'asd');
    auth.data_list = [{ otp_event: token }];
    // to-do: set redis key-value
    console.log(auth);
    return auth;
  }

  async sendOTP() {}
  async verifyOTP(otpVerifyRequestDto: OtpVerifyRequestDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          '/tsol/apikey/tuxsvc/account/user/urs-otp-verify',
          {
            acnt_no: otpVerifyRequestDto.acntNo.toUpperCase(),
            otp_val: otpVerifyRequestDto.otpVal,
            otp_enc: otpVerifyRequestDto.otpEnc,
            otp_ind: otpVerifyRequestDto.otpInd,
          },
          {
            baseURL: this.lotteBaseUrl,
            headers: {
              apiKey: this.lotteApiKey,
              'User-Agent': 'PostmanRuntime/7.37.0',
            },
          },
        )
        .pipe(
          timeout({
            each: 2000,
            with: () => throwError(() => new Error('Verify OTP timeout')),
          }),
          catchError((error: AxiosError) => {
            console.log(error);
            return throwError(error);
          }),
        ),
    );
    console.log(data);
  }

  private getTokensData(data: { username: string }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const token = this.jwtService.sign(
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
