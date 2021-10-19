import { Alert, AlertTitle, Collapse, Dialog, TextField, Typography } from '@mui/material';
import { ZProfileBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { FormEvent, useState } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZProfileAvatarForm } from './profile-avatar-form';
import { IZProfileFormProps } from './profile-form.props';
import { getAvatarUrl } from './profile-service';

/**
 * Creates a form for modifying the users profile.
 *
 * @param props The properties for the form.
 *
 * @returns The jsx rendering of the profile form.
 */
export function ZProfileForm(props: IZProfileFormProps): JSX.Element {
  const [email, setEmail] = useState<string>(get(props, 'profile.email', ''));
  const [display, setDisplay] = useState<string>(get(props, 'profile.display', ''));
  const [password, setPassword] = useState<string>(get(props, 'profile.password', ''));
  const [confirm, setConfirm] = useState<string>(get(props, 'profile.confirm', ''));
  const [avatar, setAvatar] = useState<string>(get(props, 'profile.avatar'));
  const [editAvatar, setEditAvatar] = useState(false);

  /**
   * Builds a profile given the current state of the form.
   *
   * @returns A profile that can be used to update the existing profile with new information.
   */
  function build() {
    const currentEmail = get(props, 'profile.email', '');

    let profile = new ZProfileBuilder().display(display || null).avatar(avatar);
    profile = email && email.toLowerCase() !== currentEmail.toLowerCase() ? profile.email(email) : profile;
    profile = password || confirm ? profile.password(password).confirm(confirm) : profile;
    return profile;
  }

  /**
   * Occurs when the user clicks on the avatar to edit it.
   */
  function handleEditAvatar() {
    setEditAvatar(true);
  }

  /**
   * Occurs when the user decides to close the avatar editor.
   */
  function handleCloseEditAvatar() {
    setEditAvatar(false);
  }

  /**
   * Occurs when the user edits a custom avatar and clicks the update button.
   *
   * This will actually have the same effect as if the user clicked the save button, as the
   * onProfileChange will be invoked in the properties.
   *
   * @param url The url of the avatar.
   */
  function handleUpdateAvatar(url: string) {
    const profile = build().avatar(url);
    setAvatar(url);
    setPassword('');
    setConfirm('');
    handleCloseEditAvatar();
    props.onProfileChange(profile.build());
  }

  /**
   * Occurs when the user enters in changes to the email.
   *
   * @param event The event that targets the input that changed.
   */
  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  /**
   * Occurs when the user enters in their display name.
   *
   * @param event The event that targets the input that changed.
   */
  function handleDisplayChange(event: any) {
    setDisplay(event.target.value);
  }

  /**
   * Occurs when the user enters in a new password.
   *
   * @param event The event that targets the input that changed.
   */
  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  /**
   * Occurs when the user enters in the new password confirmation.
   *
   * @param event The event that targets the input that changed.
   */
  function handleConfirmChange(event: any) {
    setConfirm(event.target.value);
  }

  /**
   * Occurs when the user clicks the Update Profile button.
   *
   * This raises the onProfileChange event in the properties.
   *
   * @param e The form event.
   */
  function handleSave(e: FormEvent) {
    e.preventDefault();
    const profile = build();
    setPassword('');
    setConfirm('');
    props.onProfileChange(profile.build());
  }

  /**
   * Creates the avatar dialog for when the user wants to edit their avatar.
   *
   * @returns The jsx for the avatar dialog.
   */
  function createAvatarDialog() {
    return (
      <Dialog className='ZProfileForm-avatar-dialog' data-testid='ZProfileForm-avatar-dialog' open={editAvatar} onClose={handleCloseEditAvatar}>
        <ZProfileAvatarForm avatar={getAvatarUrl(avatar, email)} onAvatarChange={handleUpdateAvatar} />
      </Dialog>
    );
  }

  /**
   * Creates a text field.
   *
   * @param name The name of the field.
   * @param label The field label.
   * @param type The type of field.
   * @param val The initial value.
   * @param handleInput The callback for when the field changes.
   *
   * @returns The jsx for the text field.
   */
  function createTextField(name: string, label: string, type: string, val: string, handleInput: (e: any) => void) {
    const id = `ZProfileForm-input-${name}`;
    const className = `ZProfileForm-input ${id}`;
    return <TextField className={className} data-testid={id} fullWidth={true} label={label} type={type} margin='none' variant='outlined' value={val} disabled={props.disabled} onInput={handleInput} />;
  }

  /**
   * Creates the jsx for the account information section.
   *
   * @returns The jsx for the account information section.
   */
  function createAccountInformation() {
    if (props.hideAccountInformation) {
      return null;
    }

    const displayTextField = createTextField('display', 'Display', 'text', display, handleDisplayChange);
    const emailTextField = createTextField('email', 'Email', 'email', email, handleEmailChange);
    const emailOriginal = get(props, 'profile.email', '');
    const emailDirty = emailOriginal.toLowerCase() !== email.toLowerCase();

    const emailWarning = (
      <Collapse in={emailDirty}>
        <Alert severity='warning' className='ZProfileForm-alert-email-dirty' data-testid={`ZProfileForm-alert-email-dirty-${emailDirty}`}>
          <AlertTitle>
            <Typography variant='subtitle1'>Email Changed</Typography>
          </AlertTitle>
          <Typography variant='caption'>{`If you update your profile, it will be deactivated to confirm your new email.  Your original email was ${emailOriginal}`}</Typography>
        </Alert>
      </Collapse>
    );

    return (
      <React.Fragment>
        <h4>{props.accountInformationHeaderText}</h4>
        {displayTextField}
        {emailTextField}
        {emailWarning}
      </React.Fragment>
    );
  }

  /**
   * Creates the jsx for the update password section.
   *
   * @returns The jsx for the update password section.
   */
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

  /**
   * Creates the image jsx for the avatar.
   *
   * @returns The jsx for the avatar image.
   */
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
      <form className='ZProfileForm-root' data-testid='ZProfileForm-root' noValidate={true} onSubmit={handleSave}>
        <ZPaperCard avatar={formIcon} headerText={props.headerText} subHeaderText={props.subHeaderText} loading={props.loading} disabled={props.disabled} actionText={props.saveText} actionType='submit'>
          {accountInformation}
          {updatePassword}
        </ZPaperCard>
      </form>
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
