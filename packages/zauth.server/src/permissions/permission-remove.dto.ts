import { IZPermission } from '@zthun/auth.core';
import { IsOptional, NotEquals } from 'class-validator';

export class ZPermissionRemoveDto implements Partial<IZPermission> {
  @IsOptional()
  @NotEquals(true, { message: 'You cannot delete system permissions.' })
  public system?: boolean;
}
