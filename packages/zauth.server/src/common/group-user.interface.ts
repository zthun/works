import { IZGroup, IZIdentifiable, IZUser } from '@zthun/auth.core';

export interface IZGroupUser extends IZIdentifiable {
  groupId: string;
  userId: string;
  group?: [IZGroup];
  user?: [IZUser];
}
