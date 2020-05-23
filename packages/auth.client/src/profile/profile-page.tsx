import { CircularProgress, Typography } from '@material-ui/core';
import { useLoginState } from '@zthun/auth.react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export function ZProfilePage() {
  const loginState = useLoginState();
  const [logged, setLogged] = useState(loginState.logged);

  useEffect(() => {
    const subscription = loginState.change.subscribe((updated) => setLogged(updated));
    return () => subscription.unsubscribe();
  });

  const loading = <CircularProgress className='ZProfilePage-logged-progress' data-testid='ZProfilePage-logged-progress' color='inherit' size='1em' />;
  const valid = <Typography>You have reached the profile page. You are logged in!</Typography>;
  const invalid = <Redirect to='/login' />;
  const content = logged == null ? loading : logged ? valid : invalid;

  return (
    <div className='ZProfilePage-root' data-testid='ZProfilePage-root'>
      {content}
    </div>
  );
}
