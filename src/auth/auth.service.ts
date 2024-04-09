import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';
import { AuthResponse } from './domain/auth/auth-response';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { AxiosError } from 'axios';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { LoggedInInfo } from './domain/auth/logged-in-info';
import { plainToClass } from 'class-transformer';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { VerifiedOtp } from './domain/verify-otp/verified-otp';
import { VerifiedOtpResponse } from './domain/verify-otp/verified-otp-response';

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

  async loginViaLotte(authLoginDto: LoginDto): Promise<AuthResponse> {
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
            with: () => throwError(() => new Error('Login timeout')),
          }),
          catchError((error: AxiosError) => {
            console.log(error);
            throw new HttpException(error.response?.data ? error.response.data['error_desc'] : error.response?.statusText, error.response?.status as number);
          }),
        ),
    );
    const auth = new AuthResponse();

    // to-do: custom error code & error desc
    (auth.error_code = data.error_code), (auth.error_desc = data.error_desc);
    if (data.data_list) {
      const loggedUsers = plainToClass(LoggedInInfo, data.data_list);
      // set data to response
      const { token } = this.getTokensData(loggedUsers[0].user_name, 'auth.expires');
      loggedUsers[0].otp_event = token;
      auth.data_list = loggedUsers as LoggedInInfo[];
      this.redis.hset(`user:${authLoginDto.username}`, {
        pass: authLoginDto.password,
        otp_event: token,
        otp_index: loggedUsers[0].otp_index,
      });
    }
    return auth;
  }

  async sendOTP() {}
  async verifyOTP(otpVerifyRequestDto: VerifyOTPDto): Promise<VerifiedOtpResponse> {
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
            each: 5000,
            with: () => throwError(() => new Error('Verify OTP timeout')),
          }),
          catchError((error: AxiosError) => {
            throw new HttpException(error.response?.data ? error.response.data['error_desc'] : error.response?.statusText, error.response?.status as number);
          }),
        ),
    );
    const verifiedUsers = plainToClass(VerifiedOtp, data.data_list);

    const resp = new VerifiedOtpResponse();

    // to-do: custom error code & error desc
    (resp.error_code = data.error_code), (resp.error_desc = data.error_desc);
    if (data.data_list && verifiedUsers.scrt_err_msg === '0') {
      const { token } = this.getTokensData(otpVerifyRequestDto.acntNo.toUpperCase(), 'auth.otpVerifySecret');
      verifiedUsers.sid = token;
      resp.data_list = verifiedUsers as VerifiedOtp[];
      this.redis.hset(`user:${otpVerifyRequestDto.acntNo.toLowerCase()}`, {
        otp_event: '',
        otp_index: '',
      });
    }
    return resp;
  }

  private getTokensData(data, expireTimeConfig) {
    const tokenExpiresIn = this.configService.getOrThrow(expireTimeConfig, {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const token = this.jwtService.sign(
      {
        sub: data,
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
