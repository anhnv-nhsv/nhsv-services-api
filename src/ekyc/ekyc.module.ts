import { Module } from '@nestjs/common';
import { EkycController } from './ekyc.controller';
import { EkycService } from './ekyc.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.LOTTE_BASE_URL,
      headers: {
        apiKey: process.env.LOTTE_API_KEY,
      },
    }),
  ],
  controllers: [EkycController],
  providers: [EkycService],
})
export class EkycModule {}
