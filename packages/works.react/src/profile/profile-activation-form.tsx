import { Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { ZProfileActivationBuilder } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { useState } from 'react';
import { ZPaperCard } from '../common/paper-card';
import { IZProfileActivationFormProps } from './profile-activation-form.props';

export function ZProfileActivationForm(props: IZProfileActivationFormProps) {
  const [key, setKey] = useState(get(props, 'activation.key') || '');

  function handleKeyInput(t: any) {
    setKey(t.target.value);
  }

  function handleActivate() {
    const empty = new ZProfileActivationBuilder().build();
    let activation = new ZProfileActivationBuilder().copy(props.activation || empty);
    activation = activation.key(key);
    props.onActivationChange(activation.build());
  }

  function handleNewActivate() {
    props.onActivationCreate();
  }

  function createLoading() {
    return props.loading ? <CircularProgress className='ZProfileActivationForm-progress-loading' data-testid='ZProfileActivationForm-progress-loading' color='inherit' /> : null;
  }

  return (
    <ZPaperCard
      className='ZProfileActivationForm-root'
      data-testid='ZProfileActivationForm-root'
      avatar={<PersonIcon className='ZProfileActivationForm-icon-user' fontSize='large' />}
      action={createLoading()}
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
    >
      <Typography variant='body1' component='p'>
        You must activate your account before you are allowed to perform any account related actions.
      </Typography>

      <Typography variant='body1' component='p'>
        Check your email for an activation key and copy it here.
      </Typography>

      <TextField
        className='ZProfileActivationForm-input-key'
        data-testid='ZProfileActivationForm-input-key'
        fullWidth={true}
        disabled={props.disabled || props.loading}
        label='Key'
        type='text'
        margin='none'
        variant='outlined'
        value={key}
        onInput={handleKeyInput}
      />

      <Button className='ZProfileActivationForm-btn-activate' data-testid='ZProfileActivationForm-btn-activate' fullWidth={true} variant='contained' disabled={props.disabled || props.loading || !key} color='primary' onClick={handleActivate}>
        {props.activateText}
      </Button>

      <Button className='ZProfileActivationForm-link-reactivate' data-testid='ZProfileActivationForm-link-reactivate' fullWidth={true} variant='text' disabled={props.disabled || props.loading} color='primary' onClick={handleNewActivate}>
        {props.reactivateText}
      </Button>
    </ZPaperCard>
  );
}

ZProfileActivationForm.defaultProps = {
  headerText: 'Profile',
  subHeaderText: 'Activate your account',
  activateText: 'Activate',
  reactivateText: 'Resend activation code',

  disabled: false,
  loading: false,

  activation: null,
  onActivationChange: noop,
  onActivationCreate: noop
};
