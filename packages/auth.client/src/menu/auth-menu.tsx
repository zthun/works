import { AppBar, Button, CircularProgress, Link, Toolbar, Typography } from '@material-ui/core';
import { useLoginState } from '@zthun/auth.react';
import React, { useEffect, useState } from 'react';

export function ZAuthMenu() {
  const login = useLoginState();
  const [logged, setLogged] = useState(login.logged);

  useEffect(() => {
    const subscription = login.change.subscribe((updated) => setLogged(updated));
    return () => subscription.unsubscribe();
  });

  const loginload = <CircularProgress className='ZAuthMenu-login-progress' data-testid='ZAuthMenu-login-progress' color='inherit' size='1em' />;
  const loggedout = (
    <Link color='inherit' href='#/login'>
      LOGIN
    </Link>
  );
  const loggedin = (
    <Link color='inherit' href='#/profile'>
      PROFILE
    </Link>
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
        <Button color='inherit'>{userlink}</Button>
      </Toolbar>
    </AppBar>
  );
}
