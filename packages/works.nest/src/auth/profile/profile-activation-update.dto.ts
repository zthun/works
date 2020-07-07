import { IZProfileActivation } from '@zthun/works.core';
import { IsEmail, IsString } from 'class-validator';
import { IsNotWhiteSpace } from '../../validation/is-not-white-space.function';

export class ZProfileActivationUpdateDto implements IZProfileActivation {
  @IsString({ message: 'Activation email must be a string.' })
  @IsEmail({}, { message: 'Activation email must be a valid email.' })
  public email: string;

  @IsString({ message: 'Activation key must be a string.' })
  @IsNotWhiteSpace({ message: 'Activation key must not be white space.' })
  public key: string;
}
