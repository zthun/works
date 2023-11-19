import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IZDataRequest,
  IZDataSource,
  IZPage,
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZFilterBinaryBuilder,
  ZPageBuilder
} from '@zthun/helpful-query';
import { IZVaultClient, ZVaultToken } from '@zthun/vault-client';
import { IZProject } from '@zthun/works-portfolio';

export const ZApplicationsToken = Symbol();

export interface IZApplicationsService {
  list(request: IZDataRequest): Promise<IZPage<IZProject>>;
  read(id: string): Promise<IZProject>;
}

@Injectable()
export class ZApplicationsService implements IZApplicationsService {
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

    // TODO
    // const key = new ZConfigEntryBuilder('zthunworks.com').scope('common').key('domain').build();
    // const domain = await this._vault.get(key);
    // const url = new ZUrlBuilder().protocol('https').hostname(domain.value).build();

    this._source = new ZDataSourceStatic([]);
    return this._source;
  }
}
