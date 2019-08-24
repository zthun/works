import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IZNewUserProperties } from './new-user-properties';

export class ZNewUserFormBase extends Component<IZNewUserProperties & RouteComponentProps> {
  public signInClick = this.signIn.bind(this);

  public signIn() {
    this.props.history.push(this.props.signInRoute);
  }

  public render() {
    return (
      <div className='ZNewUserForm-root' data-testid='ZNewUserForm-root'>
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
                <TextField className='mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' />
                <TextField className='mb-md' fullWidth={true} required={true} label='Password' type='password' margin='none' variant='outlined' />
                <TextField className='mb-md' fullWidth={true} required={true} label='Confirm password' type='password' margin='none' variant='outlined' />
                <Button fullWidth={true} variant='contained' color='primary'>Create account</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className='ZNewUserForm-return-to-sign-in' data-testid='ZNewUserForm-return-to-sign-in'>
          <Button fullWidth={true} variant='text' color='secondary' onClick={this.signInClick}>Already have an account? Sign in.</Button>
        </div>
      </div>
    );
  }
}

export const ZNewUserForm = withRouter(ZNewUserFormBase);
