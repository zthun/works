import { Snackbar } from '@material-ui/core';
import { IZProfile } from '@zthun/works.core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList, ZLoginState, ZLoginStateContext } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ZNotFoundPage } from '../codes/not-found-page';
import { ZHomePage } from '../home/home-page';
import { ZLoginPage } from '../login/login-page';
import { ZthunworksMenu } from '../menu/works-menu';
import { ZProfilePage } from '../profile/profile-page';

export function ZthunworksApp() {
  async function getProfile() {
    const url = new ZUrlBuilder().api().append('profiles').build();
    const profile = await Axios.get<IZProfile>(url);
    return profile.data;
  }

  return (
    <div className='Zthunworks-root' data-testid='Zthunworks-root'>
      <ZLoginStateContext.Provider value={new ZLoginState(getProfile)}>
        <ZAlertStackContext.Provider value={new ZAlertStack(5)}>
          <HashRouter>
            <ZthunworksMenu />
            <article className='Zthunworks-article' data-testid='Zthunworks-article'>
              <Switch>
                <Route exact path='/home' component={ZHomePage} />
                <Route exact path='/login' component={ZLoginPage} />
                <Route exact path='/profile' component={ZProfilePage} />
                <Route exact path='/404' component={ZNotFoundPage} />
                <Redirect from='/' to='/home' />
                <Redirect to='/404' />
              </Switch>
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
