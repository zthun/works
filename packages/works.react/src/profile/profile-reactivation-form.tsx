import { Typography } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZActionForm } from '../card/action-form';
import { IZProfileReactivationFormProps } from './profile-reactivation-form.props';

/**
 * Constructs a form for reactivating the users profile.
 *
 * @param props The properties for the form.
 *
 * @returns The jsx that renders the reactivation form.
 */
export function ZProfileReactivationForm(props: IZProfileReactivationFormProps) {
  /**
   * Occurs when the user clicks the action button.
   */
  function handleReactivate() {
    props.onReactivate();
  }

  return (
    <ZActionForm
      className='ZProfileReactivationForm-root'
      data-testid='ZProfileReactivationForm-root'
      avatar={<MailOutlineIcon fontSize='large' />}
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      actionText={props.reactivateText}
      onAction={handleReactivate}
      actionColor='secondary'
      disabled={props.disabled}
      loading={props.loading}
    >
      <Typography variant='body1' component='p'>
        {props.description}
      </Typography>
    </ZActionForm>
  );
}

ZProfileReactivationForm.defaultProps = {
  headerText: 'Resend activation code',
  subHeaderText: 'Get another code',
  description: 'If you disabled your account, lost your activation key, or your activation key has expired, you can request a new one here.',
  reactivateText: 'Send',

  disabled: false,
  loading: false,

  onReactivate: noop
};
