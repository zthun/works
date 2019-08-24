import React, { Component } from 'react';
import { ZForgotPasswordForm } from './forgot-password-form';
import { ZLoginForm } from './login-form';
import { ZNewUserForm } from './new-user-form';

export class ZLoginPage extends Component {
  public render() {
    return (
      <div className='mx-auto w-font-25 mt-em-5'>
        <div className='mb-sm'>
          <ZLoginForm />
        </div>
        <div className='mb-sm'>
          <ZNewUserForm />
        </div>
        <div className='mb-sm'>
          <ZForgotPasswordForm />
        </div>
      </div>
    );
  }
}
