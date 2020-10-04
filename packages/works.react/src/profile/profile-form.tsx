import { Dialog, TextField } from '@material-ui/core';
import { getAvatarUrl, ZProfileBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { ZActionForm } from '../common/action-form';
import { ZProfileAvatarForm } from './profile-avatar-form';
import { IZProfileFormProps } from './profile-form.props';

export function ZProfileForm(props: IZProfileFormProps): JSX.Element {
  const [email, setEmail] = useState(get(props, 'profile.email', ''));
  const [display, setDisplay] = useState(get(props, 'profile.display', ''));
  const [password, setPassword] = useState(get(props, 'profile.password', ''));
  const [confirm, setConfirm] = useState(get(props, 'profile.confirm', ''));
  const [avatar, setAvatar] = useState(get(props, 'profile.avatar'));
  const [editAvatar, setEditAvatar] = useState(false);

  function build() {
    const currentEmail = get(props, 'profile.email', '');

    let profile = new ZProfileBuilder().display(display || null).avatar(avatar);
    profile = email && email.toLowerCase() !== currentEmail.toLowerCase() ? profile.email(email) : profile;
    profile = password || confirm ? profile.password(password).confirm(confirm) : profile;
    return profile;
  }

  function handleEditAvatar() {
    setEditAvatar(true);
  }

  function handleCloseEditAvatar() {
    setEditAvatar(false);
  }

  function handleUpdateAvatar(url: string) {
    const profile = build().avatar(url);
    setAvatar(url);
    setPassword('');
    setConfirm('');
    handleCloseEditAvatar();
    props.onProfileChange(profile.build());
  }

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
    const profile = build();
    setPassword('');
    setConfirm('');
    props.onProfileChange(profile.build());
  }

  function createAvatarDialog() {
    return (
      <Dialog className='ZProfileForm-avatar-dialog' data-testid='ZProfileForm-avatar-dialog' open={editAvatar} onClose={handleCloseEditAvatar}>
        <ZProfileAvatarForm avatar={getAvatarUrl(avatar, email)} onAvatarChange={handleUpdateAvatar} />
      </Dialog>
    );
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
    return <img className='ZProfileForm-avatar' data-testid='ZProfileForm-avatar' src={getAvatarUrl(avatar, email)} onClick={handleEditAvatar} />;
  }

  const avatarDialog = createAvatarDialog();
  const accountInformation = createAccountInformation();
  const updatePassword = createUpdatePassword();
  const formIcon = createAvatarImage();

  return (
    <React.Fragment>
      {avatarDialog}
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
    </React.Fragment>
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
