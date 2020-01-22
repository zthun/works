import { IZGroup, IZIdentifiable, IZPermission } from '@zthun/auth.core';

export interface IZGroupPermission extends IZIdentifiable {
  groupId: string;
  permissionId: string;
  group?: IZGroup[];
  permission?: IZPermission[];
}
