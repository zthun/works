import React, { Component } from 'react';
import { ZForgotPasswordForm } from './forgot-password-form';
import { IZForgotPasswordProperties } from './forgot-password-properties';

export class ZForgotPasswordPage extends Component<Partial<IZForgotPasswordProperties>> {
  public static defaultProps: Partial<IZForgotPasswordProperties> = {
    signInRoute: 'login'
  };

  public render() {
    return (
      <div className='ZForgotPasswordPage-root mx-auto w-font-25 mt-em-5'>
        <ZForgotPasswordForm signInRoute={this.props.signInRoute} />
      </div>
    );
  }
}
