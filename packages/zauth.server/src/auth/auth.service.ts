import { Inject, Injectable } from '@nestjs/common';
import { IZIdentifiable, IZUser, ZAuthSystemGroup, ZAuthSystemPermission, ZGroupBuilder, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { keyBy } from 'lodash';
import { Collections } from '../common/collections.enum';
import { ZGroupPermissionBuilder } from '../common/group-permission-builder.class';
import { IZGroupPermission } from '../common/group-permission.interface';
import { ZGroupUserBuilder } from '../common/group-user-builder.class';
import { IZGroupUser } from '../common/group-user.interface';
import { DatabaseToken } from '../common/injection.constants';

@Injectable()
export class ZAuthService {
  public static constructSystemPermissionReadUsers() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.ReadUsers).name('Read Users').description('The ability to read information about the users in the system.').system().build();
  }

  public static constructSystemPermissionEditUsers() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.EditUsers).name('Edit Users').description('The ability to edit information about the users in the system.').system().build();
  }

  public static constructSystemPermissionReadPermissions() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.ReadPermissions).name('Read Permissions').description('The ability to read information about the permissions in the system.').system().build();
  }

  public static constructSystemPermissionEditPermissions() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.EditPermissions).name('Edit Permissions').description('The ability to edit permission keys in the system.').system().build();
  }

  public static constructSystemPermissionReadGroups() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.ReadGroups).name('Read Groups').description('The ability to read information about the system groups.').system().build();
  }

  public static constructSystemPermissionEditGroups() {
    return new ZPermissionBuilder().id(ZAuthSystemPermission.EditGroups).name('Edit Groups').description('The ability to edit system groups.').system().build();
  }

  public static constructSystemPermissions() {
    return [
      ZAuthService.constructSystemPermissionReadUsers(),
      ZAuthService.constructSystemPermissionEditUsers(),
      ZAuthService.constructSystemPermissionReadPermissions(),
      ZAuthService.constructSystemPermissionEditPermissions(),
      ZAuthService.constructSystemPermissionReadGroups(),
      ZAuthService.constructSystemPermissionEditGroups()
    ];
  }

  public static constructSystemGroupAdministrators() {
    return new ZGroupBuilder().id(ZAuthSystemGroup.Administrators).name('Administrators').system().build();
  }

  public static constructSystemGroupBasicUsers() {
    return new ZGroupBuilder().id(ZAuthSystemGroup.BasicUsers).name('Basic Users').system().build();
  }

  public static constructSystemGroups() {
    return [
      ZAuthService.constructSystemGroupAdministrators(),
      ZAuthService.constructSystemGroupBasicUsers()
    ];
  }

  public constructor(@Inject(DatabaseToken) private _dal: IZDatabase) { }

  public async setupSystemPermissions() {
    const permissions = ZAuthService.constructSystemPermissions();
    await this._setupSystemItems(permissions, Collections.Permissions);
  }

  public async setupSystemGroups() {
    const groups = ZAuthService.constructSystemGroups();
    await this._setupSystemItems(groups, Collections.Groups);
  }

  public async setupDefaultGroupPermissions() {
    const system = ZAuthService.constructSystemPermissions();
    const admin = ZAuthService.constructSystemGroupAdministrators();
    const wanted: IZGroupPermission[] = system.map((per) => new ZGroupPermissionBuilder().group(admin).permission(per).redact().build());
    await this._setupSystemItems(wanted, Collections.GroupsPermissions);
  }

  public async setupDefaultGroupUsers() {
    const admin = ZAuthService.constructSystemGroupAdministrators();
    const users = await this._dal.read<IZUser>(Collections.Users).filter({ super: true }).run();
    const wanted: IZGroupUser[] = users.map((superUser) => new ZGroupUserBuilder().group(admin).user(superUser).redact().build());
    await this._setupSystemItems(wanted, Collections.GroupsUsers);
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
