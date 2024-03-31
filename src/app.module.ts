import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './auth/config/auth.config';
import { EkycModule } from './ekyc/ekyc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    AuthModule,
    HomeModule,
    EkycModule,
  ],
})
export class AppModule {}
