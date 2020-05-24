import { CircularProgress, Typography } from '@material-ui/core';
import { useLoginState } from '@zthun/auth.react';
import React from 'react';
import { Redirect } from 'react-router-dom';

export function ZProfilePage() {
  const loginState = useLoginState();

  const loading = <CircularProgress className='ZProfilePage-logged-progress' data-testid='ZProfilePage-logged-progress' color='inherit' size='1em' />;
  const valid = <Typography>You have reached the profile page. You are logged in!</Typography>;
  const invalid = <Redirect to='/login' />;
  const content = loginState.logged == null ? loading : loginState.logged ? valid : invalid;

  return (
    <div className='ZProfilePage-root' data-testid='ZProfilePage-root'>
      {content}
    </div>
  );
}
