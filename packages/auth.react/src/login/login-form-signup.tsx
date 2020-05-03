import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';

export function ZLoginFormSignup() {
  const [creating, setCreating] = useState(false);
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

  return (
    <div className='ZLoginFormSignup-root'>
      <Card className='mb-md'>
        <CardHeader classes={{ root: 'pb-sm' }} title={<h3 className='m-no p-no'>Create account</h3>} subheader='Enter new account information' />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            <TextField className='ZLoginFormSignup-input-email mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' value={email} disabled={creating} onChange={handleEmailChange} />
            <TextField className='ZLoginFormSignup-input-password mb-md' fullWidth={true} required={true} label='Password' type='password' margin='none' variant='outlined' value={password} disabled={creating} onChange={handlePasswordChange} />
            <TextField className='ZLoginFormSignup-input-confirm mb-md' fullWidth={true} required={true} label='Confirm password' type='password' margin='none' variant='outlined' value={confirm} disabled={creating} onChange={handleConfirmChange} />
            <Button className='ZLoginFormSignup-btn-create' fullWidth={true} variant='contained' color='primary' disabled={creating}>
              <span>Create account</span>
              {creating ? <CircularProgress className='ZLoginFormSignup-icon-progress ml-sm' color='inherit' size='1em' /> : null}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
