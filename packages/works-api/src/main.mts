import { NestFactory } from "@nestjs/core";
import helmet from "helmet";

import { ZWorksModule } from "./app/works-module.mjs";

void (async function () {
  const app = await NestFactory.create(ZWorksModule);
  app.use(helmet());
  app.setGlobalPrefix("api");

  await app.listen(3000);
})();
