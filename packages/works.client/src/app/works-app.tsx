import { Snackbar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import MouseIcon from '@material-ui/icons/Mouse';
import { IZProfile } from '@zthun/works.core';
import { ZAlertStack, ZAlertStackContext, ZAlertStackList, ZDataState, ZLoginStateContext, ZMarkdownPage, ZStatusCodePage, ZTopBar, ZTopBarItemBuilder } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ZHomePage } from '../home/home-page';
import { ZApiPage } from '../learn/api-page';
import { ZLearnPage } from '../learn/learn-page';
import { ZLoginPage } from '../login/login-page';
import { ZProfilePage } from '../profile/profile-page';

export const ZApplicationName = 'ZTHUNWORKS';
export const ZUrlMarkdownTerms = new ZUrlBuilder().location().hash('').path('legal/TERMS.md').build();
export const ZUrlMarkdownPrivacy = new ZUrlBuilder().location().hash('').path('legal/PRIVACY.md').build();
export const ZAvatarOwl = <img className='Zthunworks-owl' src='images/svg/zthunworks-owl.svg' />;
export const ZDrawer = [
  new ZTopBarItemBuilder()
    .route('/home', 'Home')
    .avatar(<HomeIcon />)
    .build(),
  new ZTopBarItemBuilder()
    .route('/terms', 'Terms')
    .avatar(<MouseIcon />)
    .build(),
  new ZTopBarItemBuilder()
    .route('/privacy', 'Privacy')
    .avatar(<InfoIcon />)
    .build(),
  new ZTopBarItemBuilder().separator().build(),
  new ZTopBarItemBuilder()
    .link('https://github.com/zthun/works', 'GitHub')
    .avatar(<GitHubIcon />)
    .build(),
  new ZTopBarItemBuilder()
    .link('mailto:support@zthunworks.com', 'Contact')
    .avatar(<MailIcon />)
    .build()
];

/**
 * Represents the entry point of the client application.
 *
 * @returns The jsx that renders the entire application.
 */
export function ZthunworksApp() {
  /**
   * Gets the user profile.
   *
   * @returns A promise that resolves the profile.  Returns a rejected promise if the user is not logged in.
   */
  async function getProfile(): Promise<IZProfile> {
    const url = new ZUrlBuilder().api().append('profiles').build();
    const profile = await Axios.get<IZProfile>(url);
    return profile.data;
  }

  return (
    <div className='Zthunworks-root' data-testid='Zthunworks-root'>
      <ZLoginStateContext.Provider value={new ZDataState(getProfile)}>
        <ZAlertStackContext.Provider value={new ZAlertStack(5)}>
          <HashRouter>
            <ZTopBar route='/home' headerText={ZApplicationName} avatar={ZAvatarOwl} moreItems={ZDrawer}></ZTopBar>
            <article className='Zthunworks-article' data-testid='Zthunworks-article'>
              <Switch>
                <Route exact path='/home' component={ZHomePage} />
                <Route exact path='/login' component={ZLoginPage} />
                <Route exact path='/profile' component={ZProfilePage} />
                <Route exact path='/privacy' render={() => <ZMarkdownPage src={ZUrlMarkdownPrivacy} headerText='Privacy' subHeaderText='Information collection' avatar={<InfoIcon fontSize='large' />} size='lg' />} />
                <Route exact path='/terms' render={() => <ZMarkdownPage src={ZUrlMarkdownTerms} headerText='Terms' subHeaderText='Usage of this website' avatar={<MouseIcon fontSize='large' />} size='lg' />} />
                <Route exact path='/status-code/:code' render={(p) => <ZStatusCodePage code={p.match.params.code} />} />
                <Route exact path='/learn/:pkg' component={ZLearnPage} />
                <Route exact path='/learn/:pkg/api' component={ZApiPage} />
                <Route exact path='/learn/:pkg/api/:enid' component={ZApiPage} />
                <Redirect exact from='/' to='/home' />
                <Redirect to='/status-code/404' />
              </Switch>
            </article>
          </HashRouter>
          <Snackbar className='Zthunworks-snackbar' open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <ZAlertStackList />
          </Snackbar>
        </ZAlertStackContext.Provider>
      </ZLoginStateContext.Provider>
    </div>
  );
}
