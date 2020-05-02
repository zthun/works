import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ZForgotPasswordPage } from '../forgot-password/forgot-password-page';
import { ZLoginPage } from '../login/login-page';
import { ZNewUserPage } from '../new-user/new-user-page.component';

export class ZAuthApp extends React.Component {
  public render() {
    return (
      <div className='ZAuthApp-root'>
        <HashRouter>
          <Redirect to='/login' />
          <Route path='/login' component={ZLoginPage} />
          <Route path='/create-account' component={ZNewUserPage} />
          <Route path='/forgot-password' component={ZForgotPasswordPage} />
        </HashRouter>
      </div>
    );
  }
}
