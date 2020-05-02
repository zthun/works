import { IZLogin } from '@zthun/auth.core';
import { IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../validation/is-not-white-space.function';

export class ZTokenCreateDto implements Partial<IZLogin> {
  @IsString({ message: 'Email must be a string.' })
  @IsNotWhiteSpace({ message: 'Email is required.' })
  public email: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotWhiteSpace({ message: 'Password is required.' })
  public password: string;
}
