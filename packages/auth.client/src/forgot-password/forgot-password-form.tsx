import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IZForgotPasswordProperties } from './forgot-password-properties';

export class ZForgotPasswordFormBase extends Component<IZForgotPasswordProperties & RouteComponentProps> {
  public signInClick = this.signIn.bind(this);

  public signIn() {
    this.props.history.push(this.props.signInRoute);
  }

  public render() {
    return (
      <div className='ZForgotPasswordForm-root'>
        <div className='ZForgotPasswordForm-recover-account mb-md'>
          <Card>
            <CardHeader
              classes={{ root: 'pb-sm' }}
              title={<h2 className='m-no p-no'>Account recovery</h2>}
              subheader='Get back into your account'
              avatar={<FontAwesomeIcon icon={faQuestionCircle} size='3x' />}
            />
            <CardContent>
              <form noValidate={true} autoComplete='off'>
                <TextField className='mb-md' fullWidth={true} required={true} label='Email' type='email' margin='none' variant='outlined' />
                <Button fullWidth={true} variant='contained' color='primary'>Request password reset</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className='ZForgotPasswordForm-return-to-sign-in'>
          <Button className='ZForgotPasswordForm-return-to-sign-in-btn' fullWidth={true} variant='text' color='secondary' onClick={this.signInClick}>Cancel and return to sign in.</Button>
        </div>
      </div>
    );
  }
}

export const ZForgotPasswordForm = withRouter(ZForgotPasswordFormBase);
