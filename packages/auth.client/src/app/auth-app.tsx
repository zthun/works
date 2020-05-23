import { Snackbar } from '@material-ui/core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList } from '@zthun/auth.react';
import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ZHomePage } from '../home/home-page';
import { ZLoginPage } from '../login/login-page';
import { ZAuthMenu } from '../menu/auth-menu';
import { ZProfilePage } from '../profile/profile-page';

export function ZAuthApp() {
  return (
    <div className='ZAuthApp-root' data-testid='ZAuthApp-root'>
      <ZAlertStackContext.Provider value={new ZAlertStack(5)}>
        <HashRouter>
          <ZAuthMenu />
          <article className='ZAuthApp-article pt-em-4' data-testid='ZAuthApp-article'>
            <Redirect to='/home' />
            <Route path='/home' component={ZHomePage} />
            <Route path='/login' component={ZLoginPage} />
            <Route path='/profile' component={ZProfilePage} />
          </article>
        </HashRouter>
        <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <ZAlertStackList />
        </Snackbar>
      </ZAlertStackContext.Provider>
    </div>
  );
}
