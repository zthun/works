import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { ZLoginBuilder } from '@zthun/auth.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { IZLoginCredentialsFormProps } from './login-credentials-form.props';

/**
 * Represents a credentials form that allows you to modify an IZLogin object.
 *
 * @param props The propertis for the component.
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
    let login = new ZLoginBuilder().email(email).password(password).confirm(confirm);

    if (props.hideConfirm) {
      login = login.autoConfirm();
    }

    props.onCredentialsChange(login.build());
  }

  const emailTextField = props.hideEmail ? null : (
    <TextField
      className='ZLoginCredentialsForm-input-email mb-md'
      data-testid='ZLoginCredentialsForm-input-email'
      fullWidth={true}
      required={true}
      label='Email'
      type='email'
      margin='none'
      variant='outlined'
      value={email}
      disabled={props.disabled}
      onInput={handleEmailChange}
    />
  );

  const passwordTextField = props.hidePassword ? null : (
    <TextField
      className='ZLoginCredentialsForm-input-password mb-md'
      data-testid='ZLoginCredentialsForm-input-password'
      fullWidth={true}
      required={true}
      label='Password'
      type='password'
      margin='none'
      variant='outlined'
      value={password}
      disabled={props.disabled}
      onInput={handlePasswordChange}
    />
  );

  const confirmTextField =
    props.hidePassword || props.hideConfirm ? null : (
      <TextField
        className='ZLoginCredentialsForm-input-confirm mb-md'
        data-testid='ZLoginCredentialsForm-input-confirm'
        fullWidth={true}
        required={true}
        label='Confirm password'
        type='password'
        margin='none'
        variant='outlined'
        value={confirm}
        disabled={props.disabled}
        onInput={handleConfirmChange}
      />
    );

  const loadingProgress = !props.loading ? null : <CircularProgress className='ZLoginCredentialsForm-icon-progress ml-sm' data-testid='ZLoginCredentialsForm-icon-progress' color='inherit' size='1em' />;

  const actionButton = (
    <Button className='ZLoginCredentialsForm-btn-action' data-testid='ZLoginCredentialsForm-btn-action' fullWidth={true} variant='contained' color='primary' disabled={props.disabled} onClick={handleAction}>
      <span>{props.actionText}</span>
      {loadingProgress}
    </Button>
  );

  return (
    <div className='ZLoginCredentialsForm-root' data-testid='ZLoginCredentialsForm-root'>
      <Card className='mb-md'>
        <CardHeader classes={{ root: 'pb-sm' }} title={<h3 className='m-no p-no'>{props.headerText}</h3>} subheader={props.subHeaderText} />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            {emailTextField}
            {passwordTextField}
            {confirmTextField}
            {actionButton}
          </form>
        </CardContent>
      </Card>
    </div>
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

  hideEmail: false,
  hidePassword: false,
  hideConfirm: false,

  credentials: null,
  onCredentialsChange: noop
};