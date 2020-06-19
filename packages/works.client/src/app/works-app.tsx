import { Snackbar } from '@material-ui/core';
import { IZProfile, ZUrlBuilder } from '@zthun/works.core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList, ZLoginState, ZLoginStateContext } from '@zthun/works.react';
import Axios from 'axios';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
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
            <article className='Zthunworks-article pt-em-4' data-testid='Zthunworks-article'>
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
