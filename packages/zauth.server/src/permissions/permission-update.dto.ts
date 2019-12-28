import { Optional } from '@nestjs/common';
import { IZPermission } from '@zthun/auth.core';
import { Equals, IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../validation/is-not-white-space.function';

export class ZPermissionUpdateDto implements Partial<IZPermission> {
  @Optional()
  @IsString({ message: 'Permission name must be a string.' })
  @IsNotWhiteSpace({ message: 'Permission name is required and must not be blank.' })
  public name?: string;

  @Optional()
  @Equals(undefined, { message: 'You cannot change the id of an existing permission' })
  public _id?: string;
}
