import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { ZProfileBuilder } from '@zthun/auth.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { IZProfileFormProps } from './profile-form.props';

export function ZProfileForm(props: IZProfileFormProps) {
  const [admin] = useState(get(props, 'profile.super', false));
  const [email, setEmail] = useState(get(props, 'profile.email', ''));
  const [display, setDisplay] = useState(get(props, 'profile.display', ''));
  const [password, setPassword] = useState(get(props, 'profile.password', ''));
  const [newPassword, setNewPassword] = useState(get(props, 'profile.newPassword', ''));
  const [confirm, setConfirm] = useState(get(props, 'profile.confirm', ''));

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function handleDisplayChange(event: any) {
    setDisplay(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  function handleNewPasswordChange(event: any) {
    setNewPassword(event.target.value);
  }

  function handleConfirmChange(event: any) {
    setConfirm(event.target.value);
  }

  function handleAction() {
    const profile = new ZProfileBuilder().email(email).display(display).password(password).newPassword(newPassword).confirm(confirm);
    props.onProfileChange(profile.build());
  }

  function createTextField(name: string, label: string, type: string, val: string, handleInput: (e: any) => void) {
    const clasz = `ZProfileForm-input-${name} mb-md`;
    return <TextField className={clasz} data-testid={clasz} fullWidth={true} label={label} type={type} margin='none' variant='outlined' value={val} disabled={props.disabled} onInput={handleInput} />;
  }

  const displayTextField = props.hideDisplay ? null : createTextField('display', 'Display', 'text', display, handleDisplayChange);
  const emailTextField = props.hideEmail ? null : createTextField('email', 'Email', 'email', email, handleEmailChange);
  const passwordTextField = props.hidePassword ? null : createTextField('password', 'Current Password', 'password', password, handlePasswordChange);
  const newPasswordTextField = props.hidePassword ? null : createTextField('newPassword', 'New Password', 'password', newPassword, handleNewPasswordChange);
  const confirmTextField = props.hidePassword ? null : createTextField('confirm', 'Confirm Password', 'password', confirm, handleConfirmChange);

  const avatar = admin ? <SupervisorAccountIcon fontSize='large' /> : <PersonIcon fontSize='large' />;
  const loadingProgress = !props.loading ? null : <CircularProgress className='ZProfileForm-loading ml-sm' data-testid='ZProfileForm-loading ' color='inherit' size='1em' />;

  const actionButton = (
    <Button className='ZProfileForm-btn-action' data-testid='ZProfileForm-btn-action' fullWidth={true} variant='contained' color='primary' disabled={props.disabled} onClick={handleAction}>
      <span>{props.actionText}</span>
      {loadingProgress}
    </Button>
  );

  return (
    <Card className='ZProfileForm-root'>
      <CardHeader classes={{ root: 'pb-sm' }} avatar={avatar} title={<h1 className='m-no p-no'>{props.headerText}</h1>} subheader={props.subHeaderText} />
      <CardContent>
        <form noValidate={true} autoComplete='off'>
          <h2>Account Information</h2>
          {displayTextField}
          {emailTextField}
          <h2>Update Password</h2>
          {passwordTextField}
          {newPasswordTextField}
          {confirmTextField}
          {actionButton}
        </form>
      </CardContent>
    </Card>
  );
}

ZProfileForm.defaultProps = {
  hideDisplay: false,
  hideEmail: false,
  hidePassword: false,
  hideNewPassword: false,
  hideConfirm: false,

  headerText: 'Profile',
  subHeaderText: 'Update your information',
  actionText: 'Save',

  loading: false,
  disabled: false,

  profile: null,
  onProfileChange: noop
};
