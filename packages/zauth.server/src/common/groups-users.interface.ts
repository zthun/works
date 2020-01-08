import { IZGroup, IZUser } from '@zthun/auth.core';

export interface IZGroupsUsers {
  groupId: string;
  userId: string;
  group?: IZGroup;
  user?: IZUser;
}
