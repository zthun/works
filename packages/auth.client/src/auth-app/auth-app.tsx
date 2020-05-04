import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ZLoginPage } from '../login/login-page';

export function ZAuthApp() {
  return (
    <div className='ZAuthApp-root'>
      <HashRouter>
        <Redirect to='/login' />
        <Route path='/login' component={ZLoginPage} />
      </HashRouter>
    </div>
  );
}
