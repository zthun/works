import { IZGroup } from '@zthun/auth.core';
import { IsOptional, NotEquals } from 'class-validator';

export class ZGroupRemoveDto implements Partial<IZGroup> {
  @IsOptional()
  @NotEquals(true, { message: 'You cannot delete system groups.' })
  public system?: boolean;
}
