import { IZLogin } from '@zthun/works.core';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentLoading } from '../component/component-loading.interface';

/**
 * Represents properties for the ZLoginCredentialsForm.
 */
export interface IZLoginCredentialsFormProps extends IZComponentLoading, IZComponentDisabled, IZComponentHeader {
  /**
   * The text for the action button.
   *
   * The action button commits the changes to the form and
   * invokes the @see onCredentialsChange event.
   *
   * @default "Create"
   */
  actionText: string;

  /**
   * Gets or sets whether to hide the email field.
   *
   * You should hide the email field if you are doing a password
   * recovery and you already have the email and don't want to let
   * the user modify it.
   *
   * @default false
   */
  hideEmail: boolean;

  /**
   * Gets or sets whether to hide the password field.
   *
   * This also partially controls the confirm field.  If this
   * is true, then both the password and confirm fields are hidden.
   *
   * Hiding the password and confirm field is useful if you are
   * asking the user for his/her email to recover their password.
   *
   * @default false
   */
  hidePassword: boolean;

  /**
   * Gets or sets whether to hide the confirm password field.
   *
   * You don't need to confirm the password if the user is entering in their
   * email and password to log into the system.  If this is true, then
   * the output IZLogin credentials object will auto confirm the password.
   *
   * @default false
   */
  hideConfirm: boolean;

  /**
   * Gets or sets the name of the email field.
   *
   * This is mostly to support password form fillers.
   *
   * @default 'username'
   */
  nameEmail: string;

  /**
   * Gets or sets the name of the password field.
   *
   * This is mostly to support password form fillers.
   *
   * @default 'password'
   */
  namePassword: string;

  /**
   * Gets or sets the confirm field.
   *
   * This is mostly to support password form fillers.
   *
   * @default 'confirm'
   */
  nameConfirm: string;

  /**
   * Gets or sets the current credentials object.
   *
   * This will allow you to set the default field values.  If this is null,
   * then this component will set all the initial values to the empty string.
   *
   * @default null
   */
  credentials: IZLogin;

  /**
   * Occurs when the user clicks the action button to confirm the credentials object.
   *
   * @default noop
   */
  onCredentialsChange(val: IZLogin): void;
}
