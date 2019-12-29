import { IZGroup } from '@zthun/auth.core';
import { Equals, IsOptional, IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../validation/is-not-white-space.function';

export class ZGroupUpdateDto implements Partial<IZGroup> {
  @IsOptional()
  @IsString({ message: 'Group name must be a string' })
  @IsNotWhiteSpace({ message: 'Group name is required and must not be white space' })
  public name?: string;

  @IsOptional()
  @Equals(undefined, { message: 'You cannot change the system flag of a system group.' })
  public system?: boolean;
}
