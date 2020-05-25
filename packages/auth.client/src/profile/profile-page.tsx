import { CircularProgress } from '@material-ui/core';
import { useLoginState, ZProfileForm } from '@zthun/auth.react';
import React from 'react';
import { Redirect } from 'react-router-dom';

export function ZProfilePage() {
  const loginState = useLoginState();

  function createProfileLoading() {
    return <CircularProgress className='ZProfilePage-logged-progress' data-testid='ZProfilePage-logged-progress' color='inherit' />;
  }

  function createProfileForm() {
    return <ZProfileForm profile={loginState.profile} />;
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
    <div className='ZProfilePage-root mx-auto w-50 mt-em-5' data-testid='ZProfilePage-root'>
      {content}
    </div>
  );
}
