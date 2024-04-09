import { Body, Controller, Get, Post } from '@nestjs/common';
import { EkycService } from './ekyc.service';
import {
  EKYCCheckAccountExistPayloadDto,
  EKYCGetAccountInfoPayloadDto,
  EKYCGetBankPayloadDto,
  EKYCGetBrokerInfoPayloadDto,
  EKYCOpenAccountPayloadDto,
  EKYCUpdateAccountPayloadDto,
} from './dto/account-request.dto';
import {
  EKYCCheckAccountExistResponseDto,
  EKYCGetAccountInfoResponseDto,
  EKYCGetBankResponseDto,
  EKYCGetBrokerInfoResponseDto,
  EKYCOpenAccountResponseDto,
  EKYCUpdateAccountResponseDto,
} from './dto/account-response.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('EKYC Open Account')
@ApiResponse({
  status: 401,
  description: '- No API key found in request.\n\n- Unauthorized',
})
@Controller('ekyc')
export class EkycController {
  constructor(private ekycService: EkycService) {}

  @Post('account/create')
  @ApiOkResponse({ type: EKYCOpenAccountResponseDto })
  public openAccount(@Body() openAccountPayload: EKYCOpenAccountPayloadDto): Promise<EKYCOpenAccountResponseDto> {
    return this.ekycService.openAccount(openAccountPayload);
  }

  @Post('account/status')
  @ApiOkResponse({ type: EKYCCheckAccountExistResponseDto })
  public checkAccountExist(@Body() checkAccountExistPayload: EKYCCheckAccountExistPayloadDto): Promise<EKYCCheckAccountExistResponseDto> {
    return this.ekycService.checkAccountExist(checkAccountExistPayload);
  }

  @Post('account/update')
  @ApiOkResponse({ type: EKYCUpdateAccountResponseDto })
  public updateAccount(@Body() updateAccountPayload: EKYCUpdateAccountPayloadDto): Promise<EKYCUpdateAccountResponseDto> {
    return this.ekycService.updateAccount(updateAccountPayload);
  }

  @Get('account/info')
  @ApiOkResponse({ type: EKYCGetAccountInfoResponseDto })
  public getAccountInfo(@Body() getAccountInfoPayload: EKYCGetAccountInfoPayloadDto): Promise<EKYCGetAccountInfoResponseDto> {
    return this.ekycService.getAccountInfo(getAccountInfoPayload);
  }

  @Get('broker/info')
  @ApiOkResponse({ type: EKYCGetBrokerInfoResponseDto })
  public getBrokerInfo(@Body() getBrokerInfoPayload: EKYCGetBrokerInfoPayloadDto): Promise<EKYCGetBrokerInfoResponseDto> {
    return this.ekycService.getBrokerInfo(getBrokerInfoPayload);
  }

  @Get('bank-branch')
  @ApiOkResponse({ type: EKYCGetBankResponseDto })
  public getBankInfo(@Body() bankInfoPayload: EKYCGetBankPayloadDto): Promise<EKYCGetBankResponseDto> {
    return this.ekycService.getBankInfo(bankInfoPayload);
  }
}
