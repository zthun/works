import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ZWorksModule } from './app/works-module';

(async function () {
  const app = await NestFactory.create(ZWorksModule);
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.listen(3000);
})();
