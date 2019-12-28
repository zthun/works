import { IZPermission } from '@zthun/auth.core';
import { IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../validation/is-not-white-space.function';

export class ZPermissionCreateDto implements IZPermission {
  @IsString({ message: 'Permission name must be a string.' })
  @IsNotWhiteSpace({ message: 'Permission name is required and must not be blank.' })
  public name: string;

  @IsString({ message: 'Permission ids must be strings.' })
  @IsNotWhiteSpace({ message: 'Permission id is required and must not be blank.' })
  public _id: string;
}
