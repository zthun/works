import { IZGroup, IZPermission } from '@zthun/auth.core';
import { IZGroupPermission } from './group-permission.interface';

export class ZGroupPermissionBuilder {
  private _gp: IZGroupPermission;

  public constructor() {
    this._gp = {
      _id: null,
      groupId: null,
      permissionId: null
    };
  }

  public permissionId(val: string): this {
    this._gp.permissionId = val;
    return this;
  }

  public permission(val: IZPermission): this {
    this._gp.permission = [val];
    return this.permissionId(val._id);
  }

  public groupId(val: string): this {
    this._gp.groupId = val;
    return this;
  }

  public group(val: IZGroup): this {
    this._gp.group = [val];
    return this.groupId(val._id);
  }

  public assign(other: Partial<IZGroupPermission>): this {
    this._gp = Object.assign({}, this._gp, other);
    return this;
  }

  public copy(other: IZGroupPermission): this {
    this._gp = Object.assign({}, other);
    return this;
  }

  public redact() {
    delete this._gp.group;
    delete this._gp.permission;
    return this;
  }

  public build() {
    const association = { ...this._gp };
    association._id = `${this._gp.groupId}-${this._gp.permissionId}`;
    return association;
  }
}
