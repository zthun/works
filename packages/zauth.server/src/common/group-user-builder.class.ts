import { IZGroup, IZUser } from '@zthun/auth.core';
import { IZGroupUser } from './group-user.interface';

export class ZGroupUserBuilder {
  private _gp: IZGroupUser;

  public constructor() {
    this._gp = {
      _id: null,
      groupId: null,
      userId: null
    };
  }

  public userId(val: string): this {
    this._gp.userId = val;
    return this;
  }

  public user(val: IZUser): this {
    this._gp.user = [val];
    return this.userId(val._id);
  }

  public groupId(val: string): this {
    this._gp.groupId = val;
    return this;
  }

  public group(val: IZGroup): this {
    this._gp.group = [val];
    return this.groupId(val._id);
  }

  public assign(other: Partial<IZGroupUser>): this {
    this._gp = Object.assign({}, this._gp, other);
    return this;
  }

  public copy(other: IZGroupUser): this {
    this._gp = Object.assign({}, other);
    return this;
  }

  public redact() {
    delete this._gp.group;
    delete this._gp.user;
    return this;
  }

  public build() {
    const association = { ...this._gp };
    association._id = `${this._gp.groupId}-${this._gp.userId}`;
    return association;
  }
}
