import { AppBar, Button, CircularProgress, Link, MenuItem, Toolbar, Typography } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import { ZUrlBuilder } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZProfileMenu } from '@zthun/works.react';
import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function ZthunworksMenu() {
  const alerts = useAlertStack();
  const hist = useHistory();
  const login = useLoginState();

  function handleProfile() {
    hist.push('/profile');
  }

  async function handleLogin() {
    hist.push('/login');
  }

  async function handleLogout() {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.delete(url);
      await login.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(err).build());
    }
  }

  function createSpacer() {
    return <Typography className='flex-grow-1'>&nbsp;</Typography>;
  }

  function createHomeButton() {
    return (
      <Button color='inherit'>
        <CloudIcon className='mr-sm' />
        <Link color='inherit' href='#/home' variant='h5'>
          ZTHUNWORKS
        </Link>
      </Button>
    );
  }

  function createProfileMenu() {
    if (login.profile === undefined) {
      return <CircularProgress className='ZthunworksMenu-progress-loading' data-testid='ZthunworksMenu-progress-loading' color='inherit' size='1em' />;
    }

    return (
      <ZProfileMenu data-testid='ZthunworksMenu-menu-profile' profile={login.profile} onLogout={handleLogout} onLogin={handleLogin}>
        <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
      </ZProfileMenu>
    );
  }

  const home = createHomeButton();
  const spacer = createSpacer();
  const profile = createProfileMenu();

  return (
    <AppBar className='ZthunworksMenu-root' position='sticky' data-testid='ZthunworksMenu-root'>
      <Toolbar>
        {home}
        {spacer}
        {profile}
      </Toolbar>
    </AppBar>
  );
}
