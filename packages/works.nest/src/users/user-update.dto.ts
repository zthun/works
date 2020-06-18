import { IZLogin } from '@zthun/works.core';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EqualsOtherProperty } from '../validation/equals-other-property.function';
import { IsNotWhiteSpace } from '../validation/is-not-white-space.function';
import { RequiresOtherProperty } from '../validation/requires-other-property.function';

export class ZUserUpdateDto implements Partial<IZLogin> {
  @IsOptional()
  @IsString({ message: 'Email must be a string.' })
  @IsEmail({}, { message: 'The email must be a valid user@domain email.' })
  public email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @IsNotWhiteSpace({ message: 'Password cannot be white space.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @RequiresOtherProperty<IZLogin>('confirm', { message: 'Password confirmation is required.' })
  public password?: string;

  @IsOptional()
  @IsString({ message: 'Password confirmation must be a string.' })
  @IsNotWhiteSpace({ message: 'Password confirmation cannot be white space.' })
  @MinLength(8, { message: 'Password confirmation must be at least 8 characters.' })
  @EqualsOtherProperty<IZLogin>('password', { message: 'Passwords do not match' })
  public confirm?: string;
}
