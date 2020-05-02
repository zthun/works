import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { ZLoginBuilder } from '@zthun/auth.core';
import React, { ChangeEvent, useState } from 'react';
import { ZRouteButton } from '../route-button/route-button.component';
import { IZNewUserFormProps } from './new-user-form-props.interface';

export function ZNewUserForm(props: IZNewUserFormProps) {
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

  async function create() {
    setCreating(true);
    const login = new ZLoginBuilder().email(email).password(password).confirm(confirm).build();
    await props.onCreate(login);
    setCreating(false);
  }

  return (
    <div className='ZNewUserForm-root' >
      <Card className='mb-md'>
        <CardHeader
          classes={{ root: 'pb-sm' }}
          title={<h2 className='m-no p-no'>Create account</h2>}
          subheader='Enter new account information'
          avatar={<FontAwesomeIcon icon={faUser} size='3x' />}
        />
        <CardContent>
          <form noValidate={true} autoComplete='off'>
            <TextField className='ZNewUserForm-input-email mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' value={email} disabled={creating} onChange={handleEmailChange} />
            <TextField className='ZNewUserForm-input-password mb-md' fullWidth={true} required={true} label='Password' type='password' margin='none' variant='outlined' value={password} disabled={creating} onChange={handlePasswordChange} />
            <TextField className='ZNewUserForm-input-confirm mb-md' fullWidth={true} required={true} label='Confirm password' type='password' margin='none' variant='outlined' value={confirm} disabled={creating} onChange={handleConfirmChange} />
            <Button className='ZNewUserForm-btn-create' fullWidth={true} variant='contained' color='primary' onClick={create} disabled={creating}>
              <span>Create account</span>
              {creating ? <CircularProgress className='ZNewUserForm-icon-progress ml-sm' color='inherit' size='1em' /> : null}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ZRouteButton route={props.signInRoute} disabled={creating}>Already have an account? Sign in.</ZRouteButton>
    </div>
  );
}
