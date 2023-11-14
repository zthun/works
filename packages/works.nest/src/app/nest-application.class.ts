/* istanbul ignore file */

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import helmet from 'helmet';

/**
 * Represents the root access point to all @zthun based nest applications.
 */
export abstract class ZNestApplication {
  /**
   * Creates an application with standard security.
   *
   * @param module The room module to load.
   *
   * @returns The nest application that is created from the module.
   */
  public static async create(module: any) {
    const app = await NestFactory.create(module);
    app.use(helmet());
    app.use(json({ limit: '500kb' }));
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    return app;
  }

  /**
   * Runs an application.
   *
   * @param app The application to run.
   * @param port The port to run the application on.
   */
  public static async run(app: INestApplication, port = 3000) {
    await app.listen(port);
  }
}
