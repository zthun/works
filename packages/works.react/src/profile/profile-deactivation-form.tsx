import { Button, Typography } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZCircularProgress } from '../common/circular-progress';
import { ZPaperCard } from '../common/paper-card';
import { IZProfileDeactivationFormProps } from './profile-deactivation-form.props';
import { ZActionForm } from '../common/action-form';

export function ZProfileDeactivationForm(props: IZProfileDeactivationFormProps) {
  function handleDeactivate() {
    props.onDeactivate();
  }

  return (
    <ZActionForm
      className='ZProfileDeactivationForm-root'
      data-testid='ZProfileDeactivationForm-root'
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      avatar={<PauseCircleOutlineIcon fontSize='large' />}
      loading={props.loading}
      disabled={props.disabled}
      actionColor='secondary'
      onAction={handleDeactivate}
      actionText={props.deactivateText}
    >
      <Typography variant='body1' component='p'>
        {props.warningText}
      </Typography>
    </ZActionForm>
  );
}

ZProfileDeactivationForm.defaultProps = {
  headerText: 'Deactivate My Account',
  subHeaderText: 'Turn off access for awhile',
  warningText: 'This will deactivate your account.  If you wish to reactivate your account, you will need to send yourself another activation key.',
  deactivateText: 'Deactivate',

  loading: false,
  disabled: false,

  onDeactivate: noop
};
