import { TextField, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { ZProfileActivationBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { ZActionForm } from '../common/action-form';
import { IZProfileActivationFormProps } from './profile-activation-form.props';

/**
 * Renders the form for activating a users profile.
 *
 * @param props The properties for the form.
 *
 * @returns The jsx for the form.
 */
export function ZProfileActivationForm(props: IZProfileActivationFormProps): JSX.Element {
  const [key, setKey] = useState(get(props, 'activation.key') || '');

  /**
   * Occurs when the user enters input into the key field.
   *
   * @param t The event that contains the target with the update field text.
   */
  function handleKeyInput(t: any) {
    setKey(t.target.value);
  }

  /**
   * Occurs when the user clicks the activate button.
   *
   * This generates a new profile activation and raises the onActivationChange event.
   */
  function handleActivate() {
    const empty = new ZProfileActivationBuilder().build();
    let activation = new ZProfileActivationBuilder().copy(props.activation || empty);
    activation = activation.key(key);
    props.onActivationChange(activation.build());
  }

  return (
    <ZActionForm
      className='ZProfileActivationForm-root'
      data-testid='ZProfileActivationForm-root'
      avatar={<PersonIcon className='ZProfileActivationForm-icon-user' fontSize='large' />}
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      actionText={props.activateText}
      onAction={handleActivate}
      loading={props.loading}
      disabled={props.disabled || !key}
    >
      <Typography variant='body1' component='p'>
        You must activate your account before you are allowed to perform any account related actions. Check your email for an activation key and copy it here.
      </Typography>

      <TextField
        className='ZProfileActivationForm-input-key'
        data-testid='ZProfileActivationForm-input-key'
        fullWidth={true}
        disabled={props.disabled}
        label={props.keyText}
        type='text'
        margin='none'
        variant='outlined'
        value={key}
        onInput={handleKeyInput}
      />
    </ZActionForm>
  );
}

ZProfileActivationForm.defaultProps = {
  headerText: 'Activate Account',
  subHeaderText: 'Activate your account',
  keyText: 'Key',
  activateText: 'Activate',

  disabled: false,
  loading: false,

  activation: null,
  onActivationChange: noop
};
