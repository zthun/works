import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { walk } from '@zthun/helpful-node';
import {
  IZDataRequest,
  IZDataSource,
  IZPage,
  ZDataRequestBuilder,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder,
  ZFilterBinaryBuilder,
  ZPageBuilder
} from '@zthun/helpful-query';
import { IZVaultClient, ZVaultToken } from '@zthun/vault-client';
import { IZProject } from '@zthun/works-portfolio';
import { glob } from 'glob';

export const ZProjectsToken = Symbol();

export interface IZProjectsService {
  list(request: IZDataRequest): Promise<IZPage<IZProject>>;
  read(id: string): Promise<IZProject>;
}

@Injectable()
export class ZProjectsService implements IZProjectsService {
  private _source: IZDataSource<IZProject>;

  public constructor(@Inject(ZVaultToken) private readonly _vault: IZVaultClient) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZProject>> {
    const source = await this._load();
    const apps = await source.retrieve(request);
    const count = await source.count(request);
    return new ZPageBuilder<IZProject>().data(apps).count(count).build();
  }

  public async read(id: string): Promise<IZProject> {
    const source = await this._load();
    const byId = new ZFilterBinaryBuilder().subject('_id').equal().value(id).build();
    const request = new ZDataRequestBuilder().filter(byId).page(1).size(1).build();
    const [application] = await source.retrieve(request);

    if (application == null) {
      return Promise.reject(new NotFoundException(`No project with id, ${id}, exists`));
    }

    return application;
  }

  private async _load(): Promise<IZDataSource<IZProject>> {
    if (this._source) {
      return this._source;
    }

    // TODO - This doesn't scale well.  This will have to do for now as there are higher priority
    // projects in the works, but there needs to be a way to add projects without having to come
    // back and change this to make them show up.
    const assets = await walk('assets', { start: __dirname });
    const metadata = await glob(`${assets}/*.json`);
    const apps = metadata.map<IZProject>((json) => require(json));
    const options = new ZDataSourceStaticOptionsBuilder<IZProject>().search(new ZDataSearchFields(['name'])).build();
    this._source = new ZDataSourceStatic(apps, options);
    return this._source;
  }
}
