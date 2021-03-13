import { AppBar, Button, Link, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZCircularProgress, ZProfileMenu } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
   * Occurs when the user click the home link.
   */
  function handleHome() {
    hist.push('/home');
  }

  /**
   * Occurs when the user clicks the profile menu item.
   */
  function handleProfile() {
    hist.push('/profile');
  }

  /**
   * Occurs when the user clicks the login button.
   */
  async function handleLogin() {
    hist.push('/login');
  }

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

  /**
   * Creates a spacer between the home button and the login menu.
   *
   * @returns The jsx for the spacer.
   */
  function createSpacer() {
    return <Typography className='ZthunworksMenu-options'>&nbsp;</Typography>;
  }

  /**
   * Creates the home button.
   *
   * @returns The jsx for the home button.
   */
  function createHomeButton() {
    return (
      <Button className='ZthunworksMenu-btn-home' color='inherit'>
        <img className='ZthunworksMenu-icon' src='images/svg/zthunworks-owl.svg' onClick={handleHome} />
        <Link className='ZthunworksMenu-link-home' color='inherit' onClick={handleHome} variant='h5'>
          ZTHUNWORKS
        </Link>
      </Button>
    );
  }

  /**
   * Creates the profile menu.
   *
   * @returns The jsx for the profile menu.
   */
  function createProfileMenu() {
    if (login.data === undefined) {
      return <ZCircularProgress className='ZthunworksMenu-progress-loading' data-testid='ZthunworksMenu-progress-loading' />;
    }

    return (
      <ZProfileMenu data-testid='ZthunworksMenu-menu-profile' profile={login.data} onLogout={handleLogout} onLogin={handleLogin} loading={loggingOut}>
        <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
      </ZProfileMenu>
    );
  }

  const home = createHomeButton();
  const spacer = createSpacer();
  const profile = createProfileMenu();

  return (
    <AppBar className='ZthunworksMenu-root' position='sticky' color='primary' data-testid='ZthunworksMenu-root'>
      <Toolbar>
        {home}
        {spacer}
        {profile}
      </Toolbar>
    </AppBar>
  );
}
