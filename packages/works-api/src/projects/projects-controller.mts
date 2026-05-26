import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import type { IZDataRequestQuery, IZPage } from "@zthun/helpful-query";
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import type { IZProject } from "@zthun/works-portfolio";

import type { IZProjectsService } from "./projects-service.mjs";
import { ZProjectsToken } from "./projects-service.mjs";

@Controller("projects")
export class ZProjectsController {
  public constructor(
    @Inject(ZProjectsToken) private readonly _apps: IZProjectsService,
  ) {}

  @Get()
  public list(@Query() query: IZDataRequestQuery): Promise<IZPage<IZProject>> {
    const request = new ZDataRequestBuilder().query(query).build();
    return this._apps.list(request);
  }

  @Get(":id")
  public read(@Param("id") id: string): Promise<IZProject> {
    return this._apps.read(id);
  }
}
