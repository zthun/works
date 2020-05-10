import { IZLogin } from '@zthun/auth.core';

/**
 * Represents properties for the ZLoginCredentialsForm.
 */
export interface IZLoginCredentialsFormProps {
  /**
   * The header text.
   *
   * This is the text that appears in the card header.
   *
   * @default "Create Account"
   */
  headerText: string;

  /**
   * The subheader text.
   *
   * This is the text that appears underneath the card header.
   *
   * @default "Enter account credentials"
   */
  subHeaderText: string;

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
   * Gets or sets whether to disable the form.
   *
   * @default false
   */
  disabled: boolean;

  /**
   * Gets or sets whether to show the loading (working) indicator.
   *
   * Generally, when you set this, you should probably also
   * set your disabled flag to true as well.
   *
   * @default false
   */
  loading: boolean;

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
