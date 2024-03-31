import { INestApplication } from '@nestjs/common';
import redoc from 'redoc-express';

export function setupRedoc(app: INestApplication) {
  const redocOptions = {
    title: 'Your API Title',
    version: '1.0',
    specUrl: '/swagger-json',
  };

  app.use('/api-docs', redoc(redocOptions));
}
