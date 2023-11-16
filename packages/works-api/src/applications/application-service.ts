import { Inject, Injectable } from '@nestjs/common';
import { IZDataRequest, IZDataSource, IZPage, ZDataSourceStatic, ZPageBuilder } from '@zthun/helpful-query';
import { IZVaultClient, ZVaultToken } from '@zthun/vault-client';
import { IZApplication } from './application';

export const ZApplicationsToken = Symbol();

export interface IZApplicationsService {
  list(request: IZDataRequest): Promise<IZPage<IZApplication>>;
}

@Injectable()
export class ZApplicationsService implements IZApplicationsService {
  private _source: IZDataSource<IZApplication>;

  public constructor(@Inject(ZVaultToken) private readonly _vault: IZVaultClient) {}

  public async list(request: IZDataRequest): Promise<IZPage<IZApplication>> {
    const source = await this._load();
    const apps = await source.retrieve(request);
    const count = await source.count(request);
    return new ZPageBuilder<IZApplication>().data(apps).count(count).build();
  }

  private async _load(): Promise<IZDataSource<IZApplication>> {
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
