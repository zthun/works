import { Typography } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileReactivationFormProps } from './profile-reactivation-form.props';

export function ZProfileReactivationForm(props: IZProfileReactivationFormProps) {
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
