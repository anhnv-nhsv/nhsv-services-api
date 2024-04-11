import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './auth/config/auth.config';
import { EkycModule } from './ekyc/ekyc.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import databaseConfig from './database/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AllConfigType } from './config/config.type';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        type: 'single',
        url: configService.get('app.redisHost', { infer: true }),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    {
      ...HttpModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService<AllConfigType>) => ({
          baseURL: configService.get('auth.lotteBaseUrl', { infer: true }),
          headers: {
            apiKey: configService.get('auth.lotteApiKey', { infer: true }),
            'User-Agent': 'PostmanRuntime/7.37.0',
          },
        }),
      }),
      global: true,
    },
    AuthModule,
    HomeModule,
    EkycModule,
  ],
})
export class AppModule {}
