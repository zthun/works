import { Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZActionForm } from '../form/action-form';
import { IZProfileDeleteFormProps } from './profile-delete-form.props';

/**
 * Renders a form that allows the user to delete their profile after a full confirmation.
 *
 * @param props The form properties
 *
 * @returns The jsx for the delete profile form.
 */
export function ZProfileDeleteForm(props: IZProfileDeleteFormProps) {
  /**
   * Occurs when the user clicks the delete button and confirms that they want to delete their profile.
   *
   * This invokes the props.onDelete event.
   */
  function handleDelete() {
    props.onDelete();
  }

  return (
    <ZActionForm
      className='ZProfileDeleteForm-root'
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

  loading: false,
  disabled: false,

  onDelete: noop
};
