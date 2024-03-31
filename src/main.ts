import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllConfigType } from './config/config.type';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';
import { RedocModule } from 'nest-redoc';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const options = new DocumentBuilder()
    .setTitle('NHSV API Docs')
    .setVersion('1.0')
    .setContact('NHSV Contact', 'https://nhsv.vn', 'mail@example.com')
    .addTag('Test', 'test vcl')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  // setup the redoc module
  await RedocModule.setup('/redoc', app, document, {
    title: 'NHSV API Document',
    favicon: 'https://nhsv.vn/uploadfile/source/favicon.png',
    logo: {
      url: 'https://nhsv.vn/uploadfile/source/caidat/logo.png',
    },
    hideDownloadButton: true,
  });
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
