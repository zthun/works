import { Button, Typography } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZCircularProgress } from '../common/circular-progress';
import { ZPaperCard } from '../common/paper-card';
import { IZProfileReactivationFormProps } from './profile-reactivation-form.props';

export function ZProfileReactivationForm(props: IZProfileReactivationFormProps) {
  function handleReactivate() {
    props.onReactivate();
  }

  return (
    <ZPaperCard className='ZProfileReactivationForm-root' data-testid='ZProfileReactivationForm-root' avatar={<MailOutlineIcon fontSize='large' />} headerText={props.headerText} subHeaderText={props.subHeaderText}>
      <Typography variant='body1' component='p'>
        If you lost your activation key, or your activation key has expired, you can request a new one here.
      </Typography>

      <Button className='ZProfileReactivationForm-btn-reactivate' data-testid='ZProfileReactivationForm-btn-reactivate' fullWidth={true} variant='outlined' color='secondary' disabled={props.disabled} onClick={handleReactivate}>
        {props.reactivateText}
        <ZCircularProgress className='ZProfileReactivationForm-progress-loading' data-testid='ZProfileReactivationForm-progress-loading' show={props.loading} />
      </Button>
    </ZPaperCard>
  );
}

ZProfileReactivationForm.defaultProps = {
  headerText: 'Resend activation code',
  subHeaderText: 'Get another code',
  reactivateText: 'Send',

  disabled: false,
  loading: false,

  onReactivate: noop
};
