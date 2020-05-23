import { Typography } from '@material-ui/core';
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

  return logged ? (
    <div className='ZProfilePage-root' data-testid='ZProfilePage-root'>
      <Typography>You have reached the profile page. You are logged in!</Typography>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}
