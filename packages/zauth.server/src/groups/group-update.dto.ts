import { IZGroup } from '@zthun/auth.core';
import { Equals, IsOptional, IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../validation/is-not-white-space.function';

export class ZGroupUpdateDto implements Partial<IZGroup> {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @IsNotWhiteSpace({ message: 'Name is required and must not be white space' })
  public name?: string;

  @IsOptional()
  @Equals(undefined, { message: 'You cannot change the system flag.' })
  public system?: boolean;
}
