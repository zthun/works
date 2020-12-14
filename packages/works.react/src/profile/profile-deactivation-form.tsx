import { Typography } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { noop } from 'lodash';
import React from 'react';
import { ZActionForm } from '../form/action-form';
import { IZProfileDeactivationFormProps } from './profile-deactivation-form.props';

/**
 * Renders the jsx for deactivating a users profile.
 *
 * @param props The properties for the form.
 *
 * @returns The jsx for the deactivation form.
 */
export function ZProfileDeactivationForm(props: IZProfileDeactivationFormProps) {
  /**
   * Occurs when the user requests to deactivate their profile.
   *
   * This raises the props onDeactivate event.
   */
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
  headerText: 'Deactivate Account',
  subHeaderText: 'Turn off account access',
  warningText: 'This will deactivate your account.  If you wish to reactivate your account, you will need to send yourself another activation key.',
  deactivateText: 'Deactivate',

  loading: false,
  disabled: false,

  onDeactivate: noop
};
