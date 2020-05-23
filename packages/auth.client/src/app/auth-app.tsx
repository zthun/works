import { Snackbar } from '@material-ui/core';
import { ZUrlBuilder } from '@zthun/auth.core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList, ZLoginState, ZLoginStateContext } from '@zthun/auth.react';
import Axios from 'axios';
import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ZHomePage } from '../home/home-page';
import { ZLoginPage } from '../login/login-page';
import { ZAuthMenu } from '../menu/auth-menu';
import { ZProfilePage } from '../profile/profile-page';

export function ZAuthApp() {
  async function verifyLogin() {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.get(url);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className='ZAuthApp-root' data-testid='ZAuthApp-root'>
      <ZLoginStateContext.Provider value={new ZLoginState(verifyLogin)}>
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
      </ZLoginStateContext.Provider>
    </div>
  );
}
