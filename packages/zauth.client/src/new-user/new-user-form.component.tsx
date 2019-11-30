import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { ZLoginBuilder } from '@zthun/auth.core';
import Axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { ZRouteButton } from '../route-button/route-button.component';
import { IZNewUserProperties } from './new-user-properties.interface';

export function ZNewUserForm(props: IZNewUserProperties) {
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
    const body = new ZLoginBuilder().email(email).password(password).confirm(confirm).build();
    try {
      await Axios.post(props.newUserEndpoint, body);
    } catch (err) {
      // show toastrs
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className='ZNewUserForm-root' data-testid='ZNewUserForm-root' >
      <div className='ZNewUserForm-create-account mb-md' data-testid='ZNewUserForm-create-account'>
        <Card>
          <CardHeader
            classes={{ root: 'pb-sm' }}
            title={<h2 className='m-no p-no'>Create account</h2>}
            subheader='Enter new account information'
            avatar={<FontAwesomeIcon icon={faUser} size='3x' />}
          />
          <CardContent>
            <form noValidate={true} autoComplete='off'>
              <TextField className='mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' value={email} onChange={handleEmailChange} />
              <TextField className='mb-md' fullWidth={true} required={true} label='Password' type='password' margin='none' variant='outlined' value={password} onChange={handlePasswordChange} />
              <TextField className='mb-md' fullWidth={true} required={true} label='Confirm password' type='password' margin='none' variant='outlined' value={confirm} onChange={handleConfirmChange} />
              <Button fullWidth={true} variant='contained' color='primary' onClick={create}>
                <span>Create account</span>
                {creating ? <CircularProgress className='ml-sm' color='inherit' size='1em' /> : null}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className='ZNewUserPage-return-to-sign-in' data-testid='ZNewUserForm-return-to-sign-in'>
        <ZRouteButton color='secondary' route={props.signInRoute}>Already have an account? Sign in.</ZRouteButton>
      </div>
    </div >
  );
}
