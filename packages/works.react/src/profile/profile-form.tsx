import { TextField } from '@material-ui/core';
import { md5, ZProfileBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileFormProps } from './profile-form.props';

export function ZProfileForm(props: IZProfileFormProps): JSX.Element {
  const [email, setEmail] = useState(get(props, 'profile.email', ''));
  const [display, setDisplay] = useState(get(props, 'profile.display', ''));
  const [password, setPassword] = useState(get(props, 'profile.password', ''));
  const [confirm, setConfirm] = useState(get(props, 'profile.confirm', ''));
  const [avatar] = useState(get(props, 'profile.avatar', ''));

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

  function handleSave() {
    const currentEmail = get(props, 'profile.email', '');

    let profile = new ZProfileBuilder().display(display || null);
    profile = email && email.toLowerCase() !== currentEmail.toLowerCase() ? profile.email(email) : profile;
    profile = password || confirm ? profile.password(password).confirm(confirm) : profile;

    props.onProfileChange(profile.build());

    setPassword('');
    setConfirm('');
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

  function createAvatarImage() {
    let url = avatar;
    let from = 'ZProfileForm-avatar-profile';

    if (!url) {
      const profileHash = email ? md5(email) : '';
      url = `https://s.gravatar.com/avatar/${profileHash}?s=256`;
      from = profileHash ? 'ZProfileForm-avatar-gravatar' : 'ZProfileForm-avatar-default';
    }

    return <img className='ZProfileForm-avatar' data-testid={from} src={url} />;
  }

  const accountInformation = createAccountInformation();
  const updatePassword = createUpdatePassword();
  const formIcon = createAvatarImage();

  return (
    <ZActionForm
      className='ZProfileForm-root'
      data-testid='ZProfileForm-root'
      avatar={formIcon}
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      loading={props.loading}
      disabled={props.disabled}
      actionText={props.saveText}
      onAction={handleSave}
    >
      {accountInformation}
      {updatePassword}
    </ZActionForm>
  );
}

ZProfileForm.defaultProps = {
  hideAccountInformation: false,
  hidePassword: false,

  headerText: 'Profile',
  subHeaderText: 'Update your information',
  saveText: 'Update Profile',
  accountInformationHeaderText: 'Account Information',
  passwordHeaderText: 'Update Password',

  loading: false,
  disabled: false,

  profile: null,
  onProfileChange: noop
};
