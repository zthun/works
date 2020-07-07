import { CircularProgress, Grid } from '@material-ui/core';
import { useLoginState, ZProfileActivationForm, ZProfileForm } from '@zthun/works.react';
import React from 'react';
import { Redirect } from 'react-router-dom';

export function ZProfilePage() {
  const loginState = useLoginState();

  function createProfileLoading() {
    return <CircularProgress className='ZProfilePage-logged-progress' data-testid='ZProfilePage-logged-progress' color='inherit' />;
  }

  function createProfileForm() {
    return loginState.profile.active ? <ZProfileForm profile={loginState.profile} /> : <ZProfileActivationForm />;
  }

  function createProfileRedirect() {
    return <Redirect to='/login' />;
  }

  function createContentFromProfile() {
    switch (loginState.profile) {
      case undefined:
        return createProfileLoading();
      case null:
        return createProfileRedirect();
      default:
        return createProfileForm();
    }
  }

  const content = createContentFromProfile();

  return (
    <Grid className='ZProfilePage-root' data-testid='ZProfilePage-root' container={true} spacing={3} justify='center'>
      <Grid item={true}>{content}</Grid>
    </Grid>
  );
}
