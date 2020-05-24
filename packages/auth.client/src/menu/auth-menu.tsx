import { AppBar, Button, CircularProgress, Link, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { ZUrlBuilder } from '@zthun/auth.core';
import { useLoginState } from '@zthun/auth.react';
import Axios from 'axios';
import React, { MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

export function ZAuthMenu() {
  const hist = useHistory();
  const login = useLoginState();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpen(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleProfile() {
    hist.push('/profile');
    setAnchorEl(null);
  }

  async function handleLogout() {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.delete(url);
      await login.verify();
      setAnchorEl(null);
      return true;
    } catch {
      return false;
    }
  }

  const loginload = <CircularProgress className='ZAuthMenu-login-progress' data-testid='ZAuthMenu-login-progress' color='inherit' size='1em' />;
  const loggedout = (
    <Button color='inherit'>
      <Link color='inherit' href='#/login'>
        LOGIN
      </Link>
    </Button>
  );
  const meButton = (
    <Button color='inherit' onClick={handleOpen}>
      ME
    </Button>
  );
  const loggedin = (
    <div>
      {meButton}
      <Menu open={!!anchorEl} onClose={handleClose} anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
        <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
      </Menu>
    </div>
  );

  let userlink: JSX.Element;

  if (login.logged == null) {
    userlink = loginload;
  } else if (login.logged) {
    userlink = loggedin;
  } else {
    userlink = loggedout;
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
        {userlink}
      </Toolbar>
    </AppBar>
  );
}
