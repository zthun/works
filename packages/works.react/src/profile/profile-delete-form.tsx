import { Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileDeleteFormProps } from './profile-delete-form.props';

export function ZProfileDeleteForm(props: IZProfileDeleteFormProps) {
  function handleDelete() {
    props.onDelete();
  }

  return (
    <ZActionForm
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      actionText={props.deleteText}
      actionColor='secondary'
      avatar={<DeleteOutlineIcon fontSize='large' />}
      loading={props.loading}
      disabled={props.disabled}
      confirmation={
        <Typography variant='body1' component='p' color='error'>
          WARNING: This action is not reversible. Are you sure you wish to proceed?
        </Typography>
      }
      onAction={handleDelete}
    >
      <Typography variant='body1' component='p'>
        This will completely delete your account and all preferences associated with it.
      </Typography>
    </ZActionForm>
  );
}

ZProfileDeleteForm.defaultProps = {
  headerText: 'Delete Account',
  subHeaderText: 'Remove your account completely.',
  deleteText: 'Delete',
  confirmText: 'This action is not reversible.  Are you sure you wish to proceed?',
  yesText: 'Yes',
  noText: 'No',

  loading: false,
  disabled: false,

  onDelete: noop
};
