import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { noop } from 'lodash';
import React from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileAvatarFormProps } from './profile-avatar-form.props';

export function ZProfileAvatarForm(props: IZProfileAvatarFormProps) {
  return <ZActionForm className='ZProfileAvatarForm-root' data-testid='ZProfileAvatarForm-root' avatar={<PhotoCameraIcon fontSize='large' />} headerText={props.headerText} subHeaderText={props.subHeaderText} actionText={props.saveText}></ZActionForm>;
}

ZProfileAvatarForm.defaultProps = {
  headerText: 'Avatar',
  subHeaderText: 'Update your representation',
  saveText: 'Save',

  disabled: false,
  loading: false,

  avatar: null,
  onAvatarChange: noop
};
