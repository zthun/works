import { IZGroup, IZPermission } from '@zthun/auth.core';

export interface IZGroupsPermissions {
  groupId: string;
  permissionId: string;
  group?: IZGroup[];
  permission?: IZPermission[];
}
