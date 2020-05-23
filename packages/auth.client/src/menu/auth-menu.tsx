import { AppBar, Button, Link, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export function ZAuthMenu() {
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
        <Button color='inherit'>
          <Link color='inherit' href='#/login'>
            LOGIN
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
