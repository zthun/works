import { AppBar, Button, Link, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { ZUrlBuilder } from '@zthun/auth.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZProfileMenu } from '@zthun/auth.react';
import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function ZAuthMenu() {
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

  return (
    <AppBar className='ZAuthMenu-root' position='sticky' data-testid='ZAuthMenu-root'>
      <Toolbar>
        <Typography className='mr-md' variant='h5'>
          ZTHUNWORKS
        </Typography>
        <Button color='inherit'>
          <Link color='inherit' href='#/home'>
            HOME
          </Link>
        </Button>
        <Typography className='flex-grow-1'>&nbsp;</Typography>
        <ZProfileMenu profile={login.profile} onLogout={handleLogout} onLogin={handleLogin}>
          <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
        </ZProfileMenu>
      </Toolbar>
    </AppBar>
  );
}
