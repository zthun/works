import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ZForgotPasswordPage } from '../forgot-password/forgot-password-page';
import { ZLoginPage } from '../login/login-page';
import { ZNewUserPage } from '../new-user/new-user-page';

export class ZAuthApp extends React.Component {
  public renderLoginPage = this.renderLogin.bind(this);
  public renderUserPage = this.renderUser.bind(this);
  public renderForgotPasswordPage = this.renderForgotPassword.bind(this);

  public renderLogin() {
    return (
      <ZLoginPage />
    );
  }

  public renderUser() {
    return (
      <ZNewUserPage />
    );
  }

  public renderForgotPassword() {
    return (
      <ZForgotPasswordPage />
    );
  }

  public render() {
    return (
      <div className='ZLoginPage-root'>
        <HashRouter>
          <Redirect to='login' />
          <Route path='/login' render={this.renderLoginPage} />
          <Route path='/create-account' render={this.renderUserPage} />
          <Route path='/forgot-password' render={this.renderForgotPasswordPage} />
        </HashRouter>
      </div>
    );
  }
}
