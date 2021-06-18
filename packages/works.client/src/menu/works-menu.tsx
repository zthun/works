import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import MouseIcon from '@material-ui/icons/Mouse';
import { useLoginState, ZProfileButton, ZTopBar, ZTopBarItemBuilder } from '@zthun/works.react';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const ZApplicationName = 'ZTHUNWORKS';
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
 * Renders the top menu.
 *
 * @returns The jsx that renders the top menu.
 */
export function ZthunworksMenu(): JSX.Element {
  const hist = useHistory();
  const login = useLoginState();

  /**
   * Closes the more drawer if it is open and pushes the history location.
   *
   * @param loc The location to push.
   */
  function pushHistory(loc: string) {
    hist.push(loc);
  }

  const handleProfile = pushHistory.bind(null, '/profile');
  const handleLogin = pushHistory.bind(null, '/login');

  return (
    <ZTopBar route='/home' headerText={ZApplicationName} avatar={ZAvatarOwl} moreItems={ZDrawer}>
      <ZProfileButton data-testid='ZthunworksMenu-profile' profile={login.data} onProfile={handleProfile} onLogin={handleLogin} />
    </ZTopBar>
  );
}
