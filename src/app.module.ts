import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './auth/config/auth.config';
import { EkycModule } from './ekyc/ekyc.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    AuthModule,
    HomeModule,
    EkycModule,
  ],
})
export class AppModule {}
