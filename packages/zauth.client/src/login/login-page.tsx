import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ZLoginForm } from './login-form';
import { IZLoginProperties } from './login-properties';

export class ZLoginPageBase extends Component<Partial<IZLoginProperties> & RouteComponentProps> {
  public static defaultProps: Partial<IZLoginProperties> & Partial<RouteComponentProps> = {
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

export const ZLoginPage = withRouter(ZLoginPageBase);
