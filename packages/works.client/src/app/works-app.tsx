import InfoIcon from '@material-ui/icons/Info';
import MouseIcon from '@material-ui/icons/Mouse';
import { tryGetProfile, useLogin, ZAlertSnackbar, ZContent, ZMarkdownPage, ZStatusCodePage } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import React, { useEffect } from 'react';
import { HashRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ZHomePage } from '../home/home-page';
import { ZApiPage } from '../learn/api-page';
import { ZLearnPage } from '../learn/learn-page';
import { ZLoginPage } from '../login/login-page';
import { ZthunworksMenu } from '../menu/works-menu';
import { ZProfilePage } from '../profile/profile-page';

/**
 * The url to the terms markdown.
 */
export const ZUrlMarkdownTerms = new ZUrlBuilder().location().hash('').path('legal/TERMS.md').build();

/**
 * The url to the privacy markdown.
 */
export const ZUrlMarkdownPrivacy = new ZUrlBuilder().location().hash('').path('legal/PRIVACY.md').build();

/**
 * Returns the jsx for the privacy page render.
 *
 * @returns The jsx for the privacy page.
 */
export function renderPrivacyPage() {
  return <ZMarkdownPage src={ZUrlMarkdownPrivacy} headerText='Privacy' subHeaderText='Information collection' avatar={<InfoIcon fontSize='large' />} size='lg' />;
}

/**
 * Returns the jsx for the terms page render.
 *
 * @returns The jsx for the terms page.
 */
export function renderTermsPage() {
  return <ZMarkdownPage src={ZUrlMarkdownTerms} headerText='Terms' subHeaderText='Usage of this website' avatar={<MouseIcon fontSize='large' />} size='lg' />;
}

/**
 * Renders the jsx for the status code page.
 *
 * @param props The render props.
 *
 * @returns The jsx for the status code page.
 */
export function renderStatusCodePage(props: RouteComponentProps<{ code: string }>) {
  return <ZStatusCodePage code={props.match.params.code} />;
}

/**
 * Represents the entry point of the client application.
 *
 * @returns The jsx that renders the entire application.
 */
export function ZthunworksApp() {
  const login = useLogin();

  useEffect(() => {
    login.set();
    tryGetProfile().then((profile) => login.set(profile));
  });

  return (
    <div className='Zthunworks-root' data-testid='Zthunworks-root'>
      <HashRouter>
        <ZthunworksMenu />
        <ZContent>
          <Switch>
            <Route exact path='/home' component={ZHomePage} />
            <Route exact path='/login' component={ZLoginPage} />
            <Route exact path='/profile' component={ZProfilePage} />
            <Route exact path='/privacy' render={renderPrivacyPage} />
            <Route exact path='/terms' render={renderTermsPage} />
            <Route exact path='/status-code/:code' render={renderStatusCodePage} />
            <Route exact path='/learn/:pkg' component={ZLearnPage} />
            <Route exact path='/learn/:pkg/api' component={ZApiPage} />
            <Route exact path='/learn/:pkg/api/:enid' component={ZApiPage} />
            <Redirect exact from='/' to='/home' />
            <Redirect to='/status-code/404' />
          </Switch>
        </ZContent>
      </HashRouter>
      <ZAlertSnackbar />
    </div>
  );
}
