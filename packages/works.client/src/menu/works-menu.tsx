import { AppBar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MouseIcon from '@material-ui/icons/Mouse';
import { useAlertStack, useLoginState, ZAlertBuilder, ZCircularProgress, ZProfileMenu } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import { kebabCase } from 'lodash';
import React, { Fragment, MouseEventHandler, ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Renders the top menu.
 *
 * @returns The jsx that renders the top menu.
 */
export function ZthunworksMenu(): JSX.Element {
  const [loggingOut, setLoggingOut] = useState(false);
  const [moreShown, setMoreShown] = useState(false);
  const alerts = useAlertStack();
  const hist = useHistory();
  const login = useLoginState();

  /**
   * Closes the more drawer if it is open and pushes the history location.
   *
   * @param loc The location to push.
   */
  function pushHistory(loc: string) {
    setMoreShown(false);
    hist.push(loc);
  }

  /**
   * Opens a link in a separate tab.
   *
   * @param url The url to open.
   */
  function openLink(url: string) {
    setMoreShown(false);
    window.open(url, '_blank');
  }

  const handleHome = pushHistory.bind(null, '/home');
  const handleProfile = pushHistory.bind(null, '/profile');
  const handleLogin = pushHistory.bind(null, '/login');
  const handlePrivacy = pushHistory.bind(null, '/privacy');
  const handleTerms = pushHistory.bind(null, '/terms');

  const handleGithub = openLink.bind(null, 'https://github.com/zthun/works');
  const handleContact = openLink.bind(null, 'mailto:support@zthunworks.com');

  const handleOpenMore = setMoreShown.bind(null, true);
  const handleCloseMore = setMoreShown.bind(null, false);

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
      <Button className='ZthunworksMenu-btn-home' color='inherit' onClick={handleHome}>
        <img className='ZthunworksMenu-icon' src='images/svg/zthunworks-owl.svg' />
        <Typography className='ZthunworksMenu-title' color='inherit' variant='h1'>
          ZTHUNWORKS
        </Typography>
      </Button>
    );
  }

  /**
   * Creates a nav item in the more menu.
   *
   * @param text The item text
   * @param icon The icon for the item.
   * @param cb The callback handler.
   *
   * @returns The jsx for the nav list item.
   */
  function createMoreNavItem(text: string, icon: ReactNode, cb: MouseEventHandler<HTMLDivElement>) {
    const kebab = kebabCase(text);
    const clasz = `ZthunworksMenu-drawer-more-item ZthunworksMenu-drawer-more-item-${kebab}`;
    return (
      <ListItem className={clasz} button onClick={cb}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  }

  /**
   * Creates the more side button that opens the drawer.
   *
   * @returns The jsx for the more button that opens the nav drawer.
   */
  function createMoreButton() {
    return (
      <Fragment>
        <Button className='ZthunworksMenu-btn-more' data-testid='ZthunworksMenu-btn-more' color='inherit' onClick={handleOpenMore}>
          <MenuOpenIcon />
        </Button>
        <Drawer anchor='right' open={moreShown} onClose={handleCloseMore}>
          <List className='ZthunworksMenu-drawer-more' data-testid='ZthunworksMenu-drawer-more'>
            {createMoreNavItem('Home', <HomeIcon />, handleHome)}
            {createMoreNavItem('Terms', <MouseIcon />, handleTerms)}
            {createMoreNavItem('Privacy', <InfoIcon />, handlePrivacy)}
            <Divider />
            {createMoreNavItem('GitHub', <GitHubIcon />, handleGithub)}
            {createMoreNavItem('Contact', <MailIcon />, handleContact)}
          </List>
        </Drawer>
      </Fragment>
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
        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon />
          PROFILE
        </MenuItem>
      </ZProfileMenu>
    );
  }

  const home = createHomeButton();
  const spacer = createSpacer();
  const profile = createProfileMenu();
  const more = createMoreButton();

  return (
    <AppBar className='ZthunworksMenu-root' position='sticky' color='primary' data-testid='ZthunworksMenu-root'>
      <Toolbar>
        {home}
        {spacer}
        {profile}
        {more}
      </Toolbar>
    </AppBar>
  );
}
