import { Snackbar } from '@material-ui/core';
import { IZProfile } from '@zthun/works.core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList, ZDataState, ZLoginStateContext, ZProfileAvatarStateContext } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ZStatusCodePage } from '../codes/status-code-page';
import { ZHomePage } from '../home/home-page';
import { ZLoginPage } from '../login/login-page';
import { ZthunworksMenu } from '../menu/works-menu';
import { ZProfilePage } from '../profile/profile-page';

export function ZthunworksApp() {
  async function getProfile(): Promise<IZProfile> {
    const url = new ZUrlBuilder().api().append('profiles').build();
    const profile = await Axios.get<IZProfile>(url);
    return profile.data;
  }

  async function getAvatar(): Promise<Blob> {
    const url = new ZUrlBuilder().api().append('profiles').append('avatars').build();
    const avatar = await Axios.get<ArrayBufferLike>(url, { responseType: 'arraybuffer' });
    return new Blob([avatar.data]);
  }

  return (
    <div className='Zthunworks-root' data-testid='Zthunworks-root'>
      <ZProfileAvatarStateContext.Provider value={new ZDataState(getAvatar)}>
        <ZLoginStateContext.Provider value={new ZDataState(getProfile)}>
          <ZAlertStackContext.Provider value={new ZAlertStack(5)}>
            <HashRouter>
              <ZthunworksMenu />
              <article className='Zthunworks-article' data-testid='Zthunworks-article'>
                <Switch>
                  <Route exact path='/home' component={ZHomePage} />
                  <Route exact path='/login' component={ZLoginPage} />
                  <Route exact path='/profile' component={ZProfilePage} />
                  <Route exact path='/status-code/:code' component={ZStatusCodePage} />
                  <Redirect exact from='/' to='/home' />
                  <Redirect to='/status-code/404' />
                </Switch>
              </article>
            </HashRouter>
            <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <ZAlertStackList />
            </Snackbar>
          </ZAlertStackContext.Provider>
        </ZLoginStateContext.Provider>
      </ZProfileAvatarStateContext.Provider>
    </div>
  );
}
