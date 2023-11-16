import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZApplication } from './application';
import { IZApplicationsService, ZApplicationsToken } from './application-service';

@Controller()
export class ZApplicationsController {
  public constructor(@Inject(ZApplicationsToken) private readonly _apps: IZApplicationsService) {}

  @Get('applications')
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZApplication>> {
    const request = new ZDataRequestBuilder().query(query).build();
    return this._apps.list(request);
  }
}
