import { IZLogin } from '@zthun/works.core';
import { Allow, IsEmail, IsString, MinLength } from 'class-validator';
import { IsNotWhiteSpace } from '../../validation/is-not-white-space.function';

export class ZTokensLoginDto implements IZLogin {
  @IsString({ message: 'Email must be a string.' })
  @IsEmail({}, { message: 'The email must be a valid user@domain email.' })
  public email: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotWhiteSpace({ message: 'Password cannot be white space.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  public password: string;

  @Allow()
  public confirm?: string;
}
