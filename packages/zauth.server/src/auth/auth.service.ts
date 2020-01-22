import { Inject, Injectable } from '@nestjs/common';
import { IZIdentifiable, ZAuthSystemGroup, ZAuthSystemPermission, ZGroupBuilder, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { keyBy } from 'lodash';
import { Collections } from '../common/collections.enum';
import { ZGroupPermissionBuilder } from '../common/group-permission-builder.class';
import { IZGroupPermission } from '../common/group-permission.interface';
import { DatabaseToken } from '../common/injection.constants';

@Injectable()
export class ZAuthService {
  public constructor(@Inject(DatabaseToken) private _dal: IZDatabase) { }

  public constructSystemPermissionReadUsers() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.ReadUsers).name('Read Users').description('The ability to read information about the users in the system.').system().build();
  }

  public constructSystemPermissionEditUsers() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.EditUsers).name('Edit Users').description('The ability to edit information about the users in the system.').system().build();
  }

  public constructSystemPermissionReadPermissions() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.ReadPermissions).name('Read Permissions').description('The ability to read information about the permissions in the system.').system().build();
  }

  public constructSystemPermissionEditPermissions() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.EditPermissions).name('Edit Permissions').description('The ability to edit permission keys in the system.').system().build();
  }

  public constructSystemPermissionReadGroups() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.ReadGroups).name('Read Groups').description('The ability to read information about the system groups.').system().build();
  }

  public constructSystemPermissionEditGroups() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.EditGroups).name('Edit Groups').description('The ability to edit system groups.').system().build();
  }

  public constructSystemPermissions() {
    return [
      this.constructSystemPermissionReadUsers(),
      this.constructSystemPermissionEditUsers(),
      this.constructSystemPermissionReadPermissions(),
      this.constructSystemPermissionEditPermissions(),
      this.constructSystemPermissionReadGroups(),
      this.constructSystemPermissionEditGroups()
    ];
  }

  public constructSystemGroupAdministrators() {
    return new ZGroupBuilder().id(ZAuthSystemGroup.Administrators).name('Administrators').system().build();
  }

  public constructSystemGroupBasicUsers() {
    return new ZGroupBuilder().id(ZAuthSystemGroup.BasicUsers).name('Basic Users').system().build();
  }

  public constructSystemGroups() {
    return [
      this.constructSystemGroupAdministrators(),
      this.constructSystemGroupBasicUsers()
    ];
  }

  public async setupSystemPermissions() {
    const permissions = this.constructSystemPermissions();
    await this._setupSystemItems(permissions, Collections.Permissions);
  }

  public async setupSystemGroups() {
    const groups = this.constructSystemGroups();
    await this._setupSystemItems(groups, Collections.Groups);
  }

  public async setupDefaultGroupPermissions() {
    const system = this.constructSystemPermissions();
    const admin = this.constructSystemGroupAdministrators();
    const wanted: IZGroupPermission[] = system.map((per) => new ZGroupPermissionBuilder().group(admin).permission(per).redact().build());
    await this._setupSystemItems(wanted, Collections.GroupsPermissions);
  }

  private async _setupSystemItems<T extends IZIdentifiable>(items: T[], collection: string) {
    const current = await this._dal.read<T>(collection).filter({ _id: { $in: items.map((it) => it._id) } }).run();
    const currentLookup = keyBy(current, (gr) => gr._id);
    const missing = items.filter((it) => !currentLookup[it._id]);

    if (missing.length > 0) {
      await this._dal.create(collection, missing).run();
    }
  }
}
