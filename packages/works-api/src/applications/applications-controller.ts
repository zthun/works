import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZApplication } from './application';
import { IZApplicationsService, ZApplicationsToken } from './application-service';

@Controller('applications')
export class ZApplicationsController {
  public constructor(@Inject(ZApplicationsToken) private readonly _apps: IZApplicationsService) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZApplication>> {
    const request = new ZDataRequestBuilder().query(query).build();
    return this._apps.list(request);
  }

  @Get(':id')
  public read(@Param('id') id: string): Promise<IZApplication> {
    return this._apps.read(id);
  }
}
