import { TextField } from '@material-ui/core';
import { ZLoginBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { ZActionForm } from '../common/action-form';
import { IZLoginCredentialsFormProps } from './login-credentials-form.props';

/**
 * Represents a credentials form that allows you to modify an IZLogin object.
 *
 * @param props The properties for the component.
 */
export function ZLoginCredentialsForm(props: IZLoginCredentialsFormProps) {
  const [email, setEmail] = useState(get(props, 'credentials.email', ''));
  const [password, setPassword] = useState(get(props, 'credentials.password', ''));
  const [confirm, setConfirm] = useState(get(props, 'credentials.confirm', ''));

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  function handleConfirmChange(event: any) {
    setConfirm(event.target.value);
  }

  function handleAction() {
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
      name='username'
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
      name='password'
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
        name='confirm'
        margin='none'
        variant='outlined'
        value={confirm}
        disabled={props.disabled}
        onInput={handleConfirmChange}
        onChange={handleConfirmChange}
      />
    );

  return (
    <ZActionForm
      className='ZLoginCredentialsForm-root'
      data-testid='ZLoginCredentialsForm-root'
      disabled={props.disabled}
      loading={props.loading}
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      actionText={props.actionText}
      avatar={props.avatar}
      onAction={handleAction}
    >
      {emailTextField}
      {passwordTextField}
      {confirmTextField}
    </ZActionForm>
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

  credentials: null,
  onCredentialsChange: noop
};
