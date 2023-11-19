import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IZDataRequestQuery, IZPage, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZProject } from '@zthun/works-portfolio';
import { IZProjectsService, ZProjectsToken } from './projects-service';

@Controller('projects')
export class ZProjectsController {
  public constructor(@Inject(ZProjectsToken) private readonly _apps: IZProjectsService) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZProject>> {
    const request = new ZDataRequestBuilder().query(query).build();
    return this._apps.list(request);
  }

  @Get(':id')
  public read(@Param('id') id: string): Promise<IZProject> {
    return this._apps.read(id);
  }
}
