import { MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import MouseIcon from '@material-ui/icons/Mouse';
import { useAlertStack, useLoginState, ZAlertBuilder, ZProfileMenu, ZTopBar, ZTopBarItemBuilder } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import React, { useState } from 'react';
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
  const [loggingOut, setLoggingOut] = useState(false);
  const alerts = useAlertStack();
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

  /**
   * Occurs when the user clicks the logout button.
   */
  async function handleLogout() {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      setLoggingOut(true);
      await Axios.delete(url);
      await login.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(err).build());
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <ZTopBar route='/home' headerText={ZApplicationName} avatar={ZAvatarOwl} moreItems={ZDrawer}>
      <ZProfileMenu data-testid='ZthunworksMenu-profile' profile={login.data} onLogout={handleLogout} onLogin={handleLogin} loading={loggingOut}>
        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon />
          PROFILE
        </MenuItem>
      </ZProfileMenu>
    </ZTopBar>
  );
}
