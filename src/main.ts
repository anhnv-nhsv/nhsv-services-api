import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllConfigType } from './config/config.type';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';
import { RedocModule } from 'nest-redoc';
import { HttpExceptionFilter } from './filter/http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
    exclude: ['/'],
  });
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
  app.useGlobalFilters(new HttpExceptionFilter());
  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const options = new DocumentBuilder()
    .setTitle('NHSV API Docs')
    .setVersion('1.0')
    .setContact('NHSV Contact', 'https://nhsv.vn', 'mail@example.com')
    .setDescription(
      '\n\n# A - INTRODUCTION\nNH Securities Vietnam Co., Ltd (NHSV) is a 100% owned subsidiary of NH Investment & Securities, one of the largest securities firms in Korea, providing financial services including asset management, investment banking, brokerage services through 79 branches, representative offices and many subsidiaries globally. \nNHSV API enables your application to connect to NHSV investment platform, enabling your users to open account, invest / divest, and manage investment assets. Below is the summary of two user key flows throughout our platform.\n# 1. Open trading account\n- User provides necessary information to open an account (name, ID, bank account, etc.)\n- NHSV reviews the application and requests additional information (if any), then proceeds to register in NHSV\n- Once account opening is complete and activated, user will be notified via email\n\n# 2. Authentication\n- Our API v1 uses both API key and access token to access the system. In every request, you will need to supply both `x-api-key` and `Authorization: Bearer ...` in the headers of request. Most of the endpoints require the API key.\n- Please maintain the privacy and confidentiality of the API key, and only share it with relevant person of your team.\n\n# B - API DOCUMENT\n\n# 1. Http status code\n\n<table><thead><tr><th>HTTP CODE</th><th>Content</th><th>Note</th></tr></thead><tbody><tr><td>200</td><td>HttpStatus.OK</td><td>SUCCESS: Gửi yêu cầu thành công. API trả về kết quả thực hiện từ hệ thống core.</td></tr><tr><td>400</td><td>Bad Request: HttpStatus.BAD_REQUEST</td><td>INVALID_INPUT_PARAMETER: Một vài tham số input ko hợp lệ</td></tr><tr><td>401</td><td>NOT_FOUND</td><td>NOT_FOUND: Không tìm thấy resource</td></tr><tr><td>500</td><td>Internal Server Error: HttpStatus.INTERNAL_SERVER_ERROR</td><td>INTERNAL_SERVER_ERROR</td></tr><tr><td>503</td><td>Service Unavailable: HttpStatus.SERVICE_UNAVAILABLE</td><td>SERVICE_UNAVAILABLE</td></tr></tbody></table>\n\n# 2. Error code\n\n<table><thead><tr><th>Mã</th><th>Mô tả</th></tr></thead><tbody><tr><td>0</td><td>[XXXX]Thực hiện thành công</td></tr><tr><td>1005</td><td>[XXXX]Thực hiện không thành công</td></tr></tbody></table>\n\n# 3. Code table\n<table><thead><tr><th>Tên field</th><th>Giá trị</th><th>Diễn giải</th></tr></thead><tbody><tr><td colspan="3">Trạng thái lệnh - accp_tp</td></tr><tr><td></td><td>0</td><td>Tiếp nhận</td></tr><tr><td></td><td>1</td><td>Chuyển</td></tr><tr><td></td><td>2</td><td>Xác nhận lệnh</td></tr><tr><td></td><td>3</td><td>Xác nhân tiếp nhận</td></tr><tr><td></td><td>4</td><td>Khớp toàn bộ</td></tr><tr><td></td><td>5</td><td>Khớp một phần</td></tr><tr><td></td><td>6</td><td>SO actived – Không sử dụng</td></tr><tr><td></td><td>7</td><td>IO actived – Không sử dụng</td></tr><tr><td></td><td>R</td><td>Từ chối</td></tr><tr><td></td><td>X</td><td>Từ chối</td></tr><tr><td></td><td>%</td><td>Tất cả</td></tr><tr><td colspan="3">Phân loại hủy sửa - crrt_cncl_tp</td></tr><tr><td></td><td>0</td><td>Thường</td></tr><tr><td></td><td>1</td><td>Sửa một phần</td></tr><tr><td></td><td>2</td><td>Sửa toàn bộ</td></tr><tr><td></td><td>3</td><td>Hủy một phần</td></tr><tr><td></td><td>4</td><td>Hủy toàn bộ</td></tr><tr><td></td><td>%</td><td>Tất cả</td></tr><tr><td colspan="3">Phân loại lệnh - stk_ord_tp</td></tr><tr><td></td><td>1</td><td>LO - Giới hạn</td></tr><tr><td></td><td>2</td><td>MP</td></tr><tr><td></td><td>3</td><td>ATO</td></tr><tr><td></td><td>4</td><td>ATC</td></tr><tr><td></td><td>5</td><td>AON – Không sử dụng</td></tr><tr><td></td><td>6</td><td>Thỏa thuận lô lớn</td></tr><tr><td></td><td>7</td><td>MOK</td></tr><tr><td></td><td>8</td><td>MAK</td></tr><tr><td></td><td>9</td><td>MTL</td></tr><tr><td></td><td>13</td><td>SBO</td></tr><tr><td></td><td>14</td><td>OBO</td></tr><tr><td></td><td>15</td><td>PLO</td></tr><tr><td></td><td>%</td><td>Tất cả</td></tr><tr><td colspan="3">Mã ngân hàng – bank_code</td></tr><tr><td></td><td>9999</td><td>Mặc định TK ko liên kết</td></tr><tr><td></td><td>2</td><td>VCB</td></tr><tr><td></td><td>3</td><td>BIDV</td></tr><tr><td colspan="3">Ngôn ngữ - lang_code</td></tr><tr><td></td><td>V</td><td>Tiếng Việt</td></tr><tr><td></td><td>E</td><td>Tiếng Anh</td></tr><tr><td></td><td>K</td><td>Tiếng Hàn</td></tr><tr><td colspan="3">Kênh thực hiện - mdm_tp</td></tr><tr><td></td><td>0</td><td>Quầy (BOS)</td></tr><tr><td></td><td>1</td><td>Phone</td></tr><tr><td></td><td>3</td><td>WTS</td></tr><tr><td></td><td>4</td><td>HTS</td></tr><tr><td></td><td>6</td><td>MTS - iOS</td></tr><tr><td></td><td>7</td><td>MTS-iPad</td></tr><tr><td></td><td>8</td><td>MTS - Android</td></tr><tr><td></td><td>20</td><td>OMS Order</td></tr><tr><td></td><td>30</td><td>API</td></tr><tr><td></td><td>31</td><td>New MTS IOS</td></tr><tr><td></td><td>32</td><td>New MTS Android</td></tr><tr><td></td><td>33</td><td>Copy Trading</td></tr><tr><td></td><td>41</td><td>FinTech(Stag)</td></tr><tr><td></td><td>42</td><td>FinTech(DifiSoft)</td></tr><tr><td></td><td>%</td><td>Tất cả</td></tr><tr><td colspan="3">Trạng thái thị trường - controlCode</td></tr><tr><td></td><td>Sàn Hose:</td><td></td></tr><tr><td></td><td>+ P = 0: ATO</td><td></td></tr><tr><td></td><td>+ O, R = 1: Phiên liên tục</td><td></td></tr><tr><td></td><td>+ I = 2: Ngưng nghỉ trưa</td><td></td></tr><tr><td></td><td>+ A = 3: ATC</td><td></td></tr><tr><td></td><td>+ C = 4: PLO = GDTT</td><td></td></tr><tr><td></td><td>+ K = 5: Đóng cửa</td><td></td></tr><tr><td></td><td>+ G: Sau 15h</td><td></td></tr><tr><td></td><td>Sàn HNX và UPCOM:</td><td></td></tr><tr><td></td><td>+ P.O = 1: Phiên liên tục</td><td></td></tr><tr><td></td><td>+ 2 = 2: Ngưng nghỉ trưa</td><td></td></tr><tr><td></td><td>+ A = 3: ATC</td><td></td></tr><tr><td></td><td>+ C = 4: PLO = GDTT</td><td></td></tr><tr><td></td><td>+ 13,97 = 5: Đóng cửa</td><td></td></tr><tr><td colspan="3">Mã trạng thái giá - price status</td></tr><tr><td></td><td>0, 3</td><td>Tham chiếu</td></tr><tr><td></td><td>1</td><td>Trần</td></tr><tr><td></td><td>2</td><td>Tăng</td></tr><tr><td></td><td>4</td><td>Sàn</td></tr><tr><td></td><td>5</td><td>Giảm</td></tr></tbody></table>\n\n<SecurityDefinitions />\n',
    )
    .addApiKey({ type: 'apiKey', name: 'x-api-key' }, 'API Key')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'Bearer <api_token>',
      },
      'Authorization',
    )
    .addGlobalParameters({
      name: 'x-api-key',
      in: 'header',
      description: 'API Key',
      required: true,
      allowEmptyValue: false,
      schema: {
        type: 'string',
        example: 'N0ip2t3Ri9HEIbDuVABSEYrYlhtpyRwz',
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  // setup the redoc module
  await RedocModule.setup('/api-docs', app, document, {
    title: 'NHSV API Document',
    favicon: 'https://nhsv.vn/uploadfile/source/favicon.png',
    logo: {
      url: 'https://nhsv.vn/uploadfile/source/caidat/logo.png',
    },
    hideDownloadButton: true,
    theme: {
      spacing: {
        sectionVertical: 10,
      },
      logo: {
        gutter: '20px',
      },
    },
    tagGroups: [
      {
        name: 'General',
        tags: ['Home'],
      },
      {
        name: 'Authentication and OTP',
        tags: ['Authentication and OTP'],
      },
      {
        name: 'EKYC Open Account',
        tags: ['EKYC Open Account'],
      },
    ],
  });
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
