import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HomeService } from './home.service';

@ApiTags('Home')
@ApiResponse({
  status: 401,
  description: '- No API key found in request.\n\n- Unauthorized',
})
@ApiBearerAuth('Authorization')
@Controller('home')
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  @ApiOperation({ summary: 'Áp in pho', deprecated: true })
  appInfo() {
    return this.service.appInfo();
  }
}
