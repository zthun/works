import { Button, Typography } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZCircularProgress } from '../common/circular-progress';
import { ZPaperCard } from '../common/paper-card';
import { IZProfileDeactivationFormProps } from './profile-deactivation-form.props';

export function ZProfileDeactivationForm(props: IZProfileDeactivationFormProps) {
  function handleDeactivate() {
    props.onDeactivate();
  }

  return (
    <ZPaperCard className='ZProfileDeactivationForm-root' data-testid='ZProfileDeactivationForm-root' headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={<PauseCircleOutlineIcon fontSize='large' />}>
      <Typography variant='body1' component='p'>
        {props.warningText}
      </Typography>

      <Button className='ZProfileDeactivationForm-btn-deactivate' data-testid='ZProfileDeactivationForm-btn-deactivate' fullWidth={true} variant='outlined' disabled={props.disabled} color='secondary' onClick={handleDeactivate}>
        {props.deactivateText}
        <ZCircularProgress className='ZProfileDeactivationForm-progress-loading' data-testid='ZProfileDeactivationForm-progress-loading' show={props.loading} />
      </Button>
    </ZPaperCard>
  );
}

ZProfileDeactivationForm.defaultProps = {
  headerText: 'Deactivate My Account',
  subHeaderText: 'Turn off access for awhile',
  warningText: 'This will deactivate your account.  If you wish to reactivate your account, you will need to send yourself another activation key.',
  deactivateText: 'Deactivate',

  onDeactivate: noop
};
