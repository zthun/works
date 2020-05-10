import { Snackbar } from '@material-ui/core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList } from '@zthun/auth.react';
import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ZLoginPage } from '../login/login-page';

export function ZAuthApp() {
  return (
    <div className='ZAuthApp-root' data-testid='ZAuthApp-root'>
      <ZAlertStackContext.Provider value={new ZAlertStack(5)}>
        <HashRouter>
          <Redirect to='/login' />
          <Route path='/login' component={ZLoginPage} />
        </HashRouter>
        <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <ZAlertStackList />
        </Snackbar>
      </ZAlertStackContext.Provider>
    </div>
  );
}
