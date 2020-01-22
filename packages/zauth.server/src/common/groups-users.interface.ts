import { IZGroup, IZIdentifiable, IZUser } from '@zthun/auth.core';

export interface IZGroupsUsers extends IZIdentifiable {
  groupId: string;
  userId: string;
  group?: IZGroup;
  user?: IZUser;
}
