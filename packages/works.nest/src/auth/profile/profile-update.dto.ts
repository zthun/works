import { IZProfile } from '@zthun/works.core';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EqualsOtherProperty } from '../../validation/equals-other-property.function';
import { IsNotWhiteSpace } from '../../validation/is-not-white-space.function';

export class ZProfileUpdateDto implements Partial<IZProfile> {
  @IsOptional()
  @IsString({ message: 'Display must be a string.' })
  public display?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string.' })
  @IsEmail({}, { message: 'The email must be a valid user@domain email.' })
  public email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @IsNotWhiteSpace({ message: 'Password cannot be white space.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  public password?: string;

  @IsOptional()
  @IsString({ message: 'Password confirmation must be a string.' })
  @IsNotWhiteSpace({ message: 'Password confirmation cannot be white space.' })
  @MinLength(8, { message: 'Password confirmation must be at least 8 characters.' })
  @EqualsOtherProperty<IZProfile>('password', { message: 'New passwords do not match' })
  public confirm?: string;

  @IsOptional()
  @IsString({ message: 'The avatar must be a string.' })
  // @IsImageUrl({message: 'The avatar must be a url to an image of a supported type.'})
  public avatar?: string;
}
