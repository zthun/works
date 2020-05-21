import { Inject, Injectable } from '@nestjs/common';
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { DatabaseToken } from '../common/injection.constants';

@Injectable()
export class ZConfigsService {
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) {}

  public async getByKey<T>(scope: string, key: string, def: T): Promise<T> {
    let [config] = await this._dal.read<IZConfigEntry>(Collections.Configs).filter({ scope, key }).run();

    if (!config) {
      config = await this.putByKey(scope, key, def);
    }

    return config.value;
  }

  public async putByKey<T>(scope: string, key: string, val: T): Promise<IZConfigEntry> {
    const config = new ZConfigEntryBuilder<T>().scope(scope).key(key).value(val).build();
    const filter = { _id: config._id };
    const count = await this._dal.count(Collections.Configs).filter(filter).run();

    if (count > 0) {
      await this._dal.update<IZConfigEntry>(Collections.Configs, config).filter(filter).run();
    } else {
      const items = [config];
      await this._dal.create<IZConfigEntry>(Collections.Configs, items).run();
    }

    return config;
  }
}
