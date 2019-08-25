import React, { Component } from 'react';
import { ZLoginForm } from './login-form';
import { IZLoginProperties } from './login-properties';

export class ZLoginPage extends Component<Partial<IZLoginProperties>> {
  public static defaultProps: Partial<IZLoginProperties> = {
    forgotPasswordRoute: 'forgot-password',
    createAccountRoute: 'create-account'
  };

  public render() {
    return (
      <div className='ZLoginPage-root mx-auto w-font-25 mt-em-5'>
        <ZLoginForm forgotPasswordRoute={this.props.forgotPasswordRoute} createAccountRoute={this.props.createAccountRoute} />
      </div>
    );
  }
}
