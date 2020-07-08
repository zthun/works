import { Button, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { ZProfileBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { ZCircularProgress } from '../common/circular-progress';
import { ZPaperCard } from '../common/paper-card';
import { IZProfileFormProps } from './profile-form.props';

export function ZProfileForm(props: IZProfileFormProps) {
  const [admin] = useState(get(props, 'profile.super', false));
  const [email, setEmail] = useState(get(props, 'profile.email', ''));
  const [display, setDisplay] = useState(get(props, 'profile.display', ''));
  const [password, setPassword] = useState(get(props, 'profile.password', ''));
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

  function handleConfirmChange(event: any) {
    setConfirm(event.target.value);
  }

  function handleAction() {
    const profile = new ZProfileBuilder().email(email).display(display).password(password).confirm(confirm);
    props.onProfileChange(profile.build());
  }

  function createTextField(name: string, label: string, type: string, val: string, handleInput: (e: any) => void) {
    const id = `ZProfileForm-input-${name}`;
    const className = `ZProfileForm-input ${id}`;
    return <TextField className={className} data-testid={id} fullWidth={true} label={label} type={type} margin='none' variant='outlined' value={val} disabled={props.disabled} onInput={handleInput} />;
  }

  function createAccountInformation() {
    if (props.hideAccountInformation) {
      return null;
    }

    const displayTextField = createTextField('display', 'Display', 'text', display, handleDisplayChange);
    const emailTextField = createTextField('email', 'Email', 'email', email, handleEmailChange);

    return (
      <React.Fragment>
        <h4>{props.accountInformationHeaderText}</h4>
        {displayTextField}
        {emailTextField}
      </React.Fragment>
    );
  }

  function createUpdatePassword() {
    if (props.hidePassword) {
      return null;
    }

    const passwordTextField = createTextField('password', 'New Password', 'password', password, handlePasswordChange);
    const confirmTextField = createTextField('confirm', 'Confirm Password', 'password', confirm, handleConfirmChange);

    return (
      <React.Fragment>
        <h4>{props.passwordHeaderText}</h4>
        {passwordTextField}
        {confirmTextField}
      </React.Fragment>
    );
  }

  function createAvatar() {
    return admin ? <SupervisorAccountIcon className='ZProfileForm-icon-superuser' data-testid='ZProfileForm-icon-superuser' fontSize='large' /> : <PersonIcon className='ZProfileForm-icon-user' data-testid='ZProfileForm-icon-user' fontSize='large' />;
  }

  const accountInformation = createAccountInformation();
  const updatePassword = createUpdatePassword();
  const avatar = createAvatar();

  return (
    <ZPaperCard className='ZProfileForm-root' data-testid='ZProfileForm-root' avatar={avatar} headerText={props.headerText} subHeaderText={props.subHeaderText}>
      <form noValidate={true} autoComplete='off'>
        {accountInformation}
        {updatePassword}

        <Button className='ZProfileForm-btn-action' data-testid='ZProfileForm-btn-action' fullWidth={true} variant='contained' color='primary' disabled={props.disabled} onClick={handleAction}>
          <span>{props.actionText}</span>
          <ZCircularProgress className='ZProfileForm-progress-loading ml-sm' data-testid='ZProfileForm-progress-loading ' show={props.loading} />
        </Button>
      </form>
    </ZPaperCard>
  );
}

ZProfileForm.defaultProps = {
  hideAccountInformation: false,
  hidePassword: false,

  headerText: 'Profile',
  subHeaderText: 'Update your information',
  actionText: 'Save',
  accountInformationHeaderText: 'Account Information',
  passwordHeaderText: 'Update Password',

  loading: false,
  disabled: false,

  profile: null,
  onProfileChange: noop
};
