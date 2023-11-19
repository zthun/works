import { IZDataRequest, IZDataSource, IZPage } from '@zthun/helpful-query';
import { IZHttpService, ZHttpRequestBuilder, ZHttpService } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZProject } from '@zthun/works-portfolio';
import { createContext, useContext } from 'react';

export interface IZProjectsService extends IZDataSource<IZProject> {}

export class ZProjectsService implements IZProjectsService {
  public constructor(private readonly _http: IZHttpService) {}

  public api() {
    return new ZUrlBuilder().api(location).append('projects');
  }

  public request(url: string) {
    return new ZHttpRequestBuilder().url(url).get();
  }

  public async count(request: IZDataRequest): Promise<number> {
    const url = this.api().page(1).size(1).search(request.search).build();
    const { data: page } = await this._http.request<IZPage<IZProject>>(this.request(url).build());
    return page.count;
  }

  public async retrieve(request: IZDataRequest): Promise<IZProject[]> {
    const url = this.api().page(request.page).size(request.size).search(request.search).build();
    const { data: page } = await this._http.request<IZPage<IZProject>>(this.request(url).build());
    return page.data;
  }
}

export function createDefaultProjectsService(): IZProjectsService {
  return new ZProjectsService(new ZHttpService());
}

export const ZProjectsServiceContext = createContext(createDefaultProjectsService());

export const useProjectsService = () => useContext(ZProjectsServiceContext);
