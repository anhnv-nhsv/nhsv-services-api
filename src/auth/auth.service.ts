import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';
import { AuthResponseDto } from './domain/auth-response';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { AxiosError } from 'axios';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { LoggedInInfoDto } from './domain/logged-in-info';
import { plainToClass } from 'class-transformer';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService<AllConfigType>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  private lotteBaseUrl = this.configService.getOrThrow('auth.lotteBaseUrl', {
    infer: true,
  });
  private lotteApiKey = this.configService.getOrThrow('auth.lotteApiKey', {
    infer: true,
  });

  async loginViaLotte(authLoginDto: LoginDto): Promise<AuthResponseDto> {
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
            each: 5000,
            with: () => throwError(() => new Error('Verify user timeout')),
          }),
          catchError((error: AxiosError) => {
            console.log(error);
            throwError(error);
          }),
        ),
    );
    console.log('data', data);
    const loggedUsers = plainToClass(LoggedInInfoDto, data.data_list);
    // set data to response
    const { token } = this.getTokensData({
      username: loggedUsers[0].user_name,
    });
    const auth = new AuthResponseDto();
    (auth.error_code = '0000'), (auth.error_desc = 'asd');
    loggedUsers[0].otp_event = token;
    auth.data_list = loggedUsers as LoggedInInfoDto[];
    // to-do: set redis key-value
    this.redis.hset(`user:${authLoginDto.username}`, {
      pass: authLoginDto.password,
      otp_event: token,
      otp_index: loggedUsers[0].otp_index,
    });
    return auth;
  }

  async sendOTP() {}
  async verifyOTP(otpVerifyRequestDto: VerifyOTPDto) {
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
