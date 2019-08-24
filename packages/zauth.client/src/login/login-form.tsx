import { faQuestionCircle, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import React, { Component } from 'react';

export class ZLoginForm extends Component {
  public render() {
    return (
      <div className='ZLoginForm-root' data-testid='ZLoginForm-root'>
        <div className='ZLoginForm-existing-user mb-md' data-testid='ZLoginForm-existing-user'>
          <Card>
            <CardHeader
              classes={{ root: 'pb-sm' }}
              title={<h2 className='m-no p-no'>Existing user?</h2>}
              subheader='Enter your credentials'
              avatar={<FontAwesomeIcon icon={faSignInAlt} size='3x' />}
            />
            <CardContent>
              <form noValidate={true} autoComplete='off'>
                <TextField className='mb-md' fullWidth={true} label='Email' type='email' margin='none' variant='outlined' />
                <TextField className='mb-md' fullWidth={true} label='Password' type='password' margin='none' variant='outlined' />
                <Button fullWidth={true} variant='contained' color='primary'>Login</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className='ZLoginForm-new-user mb-md' data-testid='ZLoginForm-new-user'>
          <Card>
            <CardHeader
              classes={{ root: 'pb-sm' }}
              title={<h2 className='m-no p-no'>New user?</h2>}
              subheader={`Let's create an account`}
              avatar={<FontAwesomeIcon icon={faUser} size='3x' />}
            />
            <CardContent>
              <form noValidate={true} autoComplete='off'>
                <Button fullWidth={true} variant='outlined' color='primary'>Get started</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className='ZLoginForm-forgot-password mb-md' data-testid='ZLoginForm-forgot-password'>
          <Card>
            <CardHeader
              classes={{ root: 'pb-sm' }}
              title={<h2 className='m-no p-no'>Having trouble?</h2>}
              subheader={`Can't access your account?`}
              avatar={<FontAwesomeIcon icon={faQuestionCircle} size='3x' />}
            />
            <CardContent>
              <form noValidate={true} autoComplete='off'>
                <Button fullWidth={true} variant='outlined' color='secondary'>I forgot my password</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
