import { IZProfile, ZProfileAvatarMaxBytes } from '@zthun/works.core';
import { IsDataURI, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EqualsOtherProperty } from '../../validation/equals-other-property.function';
import { IsDataURILimit } from '../../validation/is-data-uri-limit.function';
import { IsDataURIType } from '../../validation/is-data-uri-type.function';
import { IsNotWhiteSpace } from '../../validation/is-not-white-space.function';

/**
 * Represents the DTO to update a profile.
 */
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
  @IsDataURI({ message: 'The avatar must be a data uri.  External cross origin urls are not supported.' })
  @IsDataURIType(['image/png'], { message: 'The avatar data uri must be a png image.' })
  @IsDataURILimit(0, ZProfileAvatarMaxBytes, { message: 'The avatar storage size is too big.  Your avatar must encode to less than 128KB.  Use gravatar if you would like to use larger images.' })
  public avatar?: string;
}
