import { IZProfileActivation } from '@zthun/works.core';
import { IsEmail, IsString, IsOptional, Equals } from 'class-validator';
import { IsNotWhiteSpace } from '../../validation/is-not-white-space.function';

export class ZProfileActivationCreateDto implements IZProfileActivation {
  @IsString({ message: 'Activation email must be a string.' })
  @IsEmail({}, { message: 'Activation email must be a valid email.' })
  public email: string;

  @IsOptional()
  @Equals(null, { message: 'Activation key must be null or undefined.' })
  public key: string;
}
