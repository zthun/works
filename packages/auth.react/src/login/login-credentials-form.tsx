import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { ZLoginBuilder } from '@zthun/auth.core';
import React, { ChangeEvent, useState } from 'react';
import { IZLoginCredentialsFormProps } from './login-credentials-form.props';

export function ZLoginCredentialsForm(props: IZLoginCredentialsFormProps) {
  const [running, setRunning] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmChange(event: ChangeEvent<HTMLInputElement>) {
    setConfirm(event.target.value);
  }

  async function handleRun() {
    setRunning(true);

    try {
      const credentials = new ZLoginBuilder().email(email).password(password).confirm(confirm).build();
      await props.run(credentials);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className='ZLoginFormSignup-root'>
      <Card className='mb-md'>
        <CardHeader classes={{ root: 'pb-sm' }} title={<h3 className='m-no p-no'>{props.headerText}</h3>} subheader={props.subHeaderText} />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            <TextField className='ZLoginFormSignup-input-email mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' value={email} disabled={running} onChange={handleEmailChange} />
            {props.hidePassword ? null : (
              <TextField className='ZLoginFormSignup-input-password mb-md' fullWidth={true} required={true} label='Password' type='password' margin='none' variant='outlined' value={password} disabled={running} onChange={handlePasswordChange} />
            )}
            {props.hidePassword || props.hideConfirm ? null : (
              <TextField className='ZLoginFormSignup-input-confirm mb-md' fullWidth={true} required={true} label='Confirm password' type='password' margin='none' variant='outlined' value={confirm} disabled={running} onChange={handleConfirmChange} />
            )}
            <Button className='ZLoginFormSignup-btn-create' fullWidth={true} variant='contained' color='primary' disabled={running} onClick={handleRun}>
              <span>{props.actionText}</span>
              {running ? <CircularProgress className='ZLoginFormSignup-icon-progress ml-sm' color='inherit' size='1em' /> : null}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
