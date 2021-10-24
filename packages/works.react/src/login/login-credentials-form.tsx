import { TextField } from '@mui/material';
import { IZLogin, ZLoginBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { FormEvent, useState } from 'react';
import { ZPaperCard } from '../card/paper-card';
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

/**
 * Represents a credentials form that allows you to modify an IZLogin object.
 *
 * @param props The properties for the component.
 *
 * @returns The jsx that renders the credentials form.
 */
export function ZLoginCredentialsForm(props: IZLoginCredentialsFormProps) {
  const [email, setEmail] = useState(get(props, 'credentials.email', ''));
  const [password, setPassword] = useState(get(props, 'credentials.password', ''));
  const [confirm, setConfirm] = useState(get(props, 'credentials.confirm', ''));

  /**
   * Occurs when the user makes a change to the email field.
   *
   * @param event An input event or change event.
   */
  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  /**
   * Occurs when the user makes a change to the password field.
   *
   * @param event An input event or change event.
   */
  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  /**
   * Occurs when the user makes a change to the confirm field.
   *
   * @param event An input event or change event.
   */
  function handleConfirmChange(event: any) {
    setConfirm(event.target.value);
  }

  /**
   * Occurs when the user clicks the action button.
   *
   * @param e The submission event.
   */
  function handleAction(e: FormEvent) {
    e.preventDefault();
    let login = new ZLoginBuilder().email(email);

    if (!props.hidePassword && !props.hideConfirm) {
      login = login.password(password).confirm(confirm);
    } else if (!props.hidePassword) {
      login = login.password(password).autoConfirm();
    }

    props.onCredentialsChange(login.build());
  }

  const emailTextField = props.hideEmail ? null : (
    <TextField
      className='ZLoginCredentialsForm-input ZLoginCredentialsForm-input-email'
      data-testid='ZLoginCredentialsForm-input-email'
      fullWidth={true}
      required={true}
      label='Email'
      type='email'
      name={props.nameEmail}
      autoComplete={props.nameEmail}
      margin='none'
      variant='outlined'
      autoFocus={true}
      value={email}
      disabled={props.disabled}
      onInput={handleEmailChange}
      onChange={handleEmailChange}
    />
  );

  const passwordTextField = props.hidePassword ? null : (
    <TextField
      className='ZLoginCredentialsForm-input ZLoginCredentialsForm-input-password'
      data-testid='ZLoginCredentialsForm-input-password'
      fullWidth={true}
      required={true}
      label='Password'
      name={props.namePassword}
      autoComplete={props.namePassword}
      type='password'
      margin='none'
      variant='outlined'
      value={password}
      disabled={props.disabled}
      onInput={handlePasswordChange}
      onChange={handlePasswordChange}
    />
  );

  const confirmTextField =
    props.hidePassword || props.hideConfirm ? null : (
      <TextField
        className='ZLoginCredentialsForm-input ZLoginCredentialsForm-input-confirm'
        data-testid='ZLoginCredentialsForm-input-confirm'
        fullWidth={true}
        required={true}
        label='Confirm password'
        type='password'
        name={props.nameConfirm}
        autoComplete={props.namePassword}
        margin='none'
        variant='outlined'
        value={confirm}
        disabled={props.disabled}
        onInput={handleConfirmChange}
        onChange={handleConfirmChange}
      />
    );

  return (
    <form className='ZLoginCredentialsForm-root' data-testid='ZLoginCredentialsForm-root' noValidate={true} onSubmit={handleAction}>
      <ZPaperCard disabled={props.disabled} loading={props.loading} headerText={props.headerText} subHeaderText={props.subHeaderText} actionText={props.actionText} actionType='submit' avatar={props.avatar}>
        {emailTextField}
        {passwordTextField}
        {confirmTextField}
      </ZPaperCard>
    </form>
  );
}

/**
 * The default properties.
 *
 * @see IZLoginCredentialsFormProps for the default values.
 */
ZLoginCredentialsForm.defaultProps = {
  headerText: 'Create Account',
  subHeaderText: 'Enter account credentials',
  actionText: 'Create',
  loading: false,
  disabled: false,
  avatar: null,

  hideEmail: false,
  hidePassword: false,
  hideConfirm: false,

  nameEmail: 'username',
  namePassword: 'password',
  nameConfirm: 'confirm',

  credentials: null,
  onCredentialsChange: noop
};
