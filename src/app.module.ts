import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './auth/config/auth.config';
import { EkycModule } from './ekyc/ekyc.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import databaseConfig from './database/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    HomeModule,
    EkycModule,
  ],
})
export class AppModule {}
