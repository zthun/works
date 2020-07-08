import { Grid } from '@material-ui/core';
import { IZProfileActivation, ZProfileActivationBuilder, ZUrlBuilder } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZCircularProgress, ZProfileActivationForm, ZProfileDeactivationForm, ZProfileForm } from '@zthun/works.react';
import Axios from 'axios';
import { get } from 'lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export function ZProfilePage() {
  const loginState = useLoginState();
  const alerts = useAlertStack();
  const [activating, setActivating] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [reactivating, setReactivating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [activation, setActivation] = useState(new ZProfileActivationBuilder().email(get(loginState.profile, 'email', null)).build());

  async function handleActivationChange<T>(successMsg: string, changeFn: (url: string) => Promise<T>) {
    try {
      const url = new ZUrlBuilder().api().append('profiles').append('activations').build();
      await changeFn(url);
      alerts.add(new ZAlertBuilder().success().message(successMsg).build());
      loginState.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    }
  }

  async function handleActivation(value: IZProfileActivation) {
    setActivation(value);
    setActivating(true);
    handleActivationChange('Account activated', (url) => Axios.put(url, value));
    setActivating(false);
  }

  async function handleReactivation() {
    setReactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.profile.email).build();
    handleActivationChange('Activation code sent.  Please check your email.', (url) => Axios.post(url, body));
    setReactivating(false);
  }

  async function handleDeactivation() {
    setDeactivating(true);
    handleActivationChange('Account deactivated.Send yourself another activation code to reactivate.', (url) => Axios.delete(url));
    setDeactivating(false);
  }

  function createProfileLoading() {
    return <ZCircularProgress className='ZProfilePage-progress-profile-loading' data-testid='ZProfilePage-progress-profile-loading' size='5em' />;
  }

  function createProfileActivatedForm() {
    return (
      <div className='ZPaperCard-group'>
        <ZProfileForm profile={loginState.profile} disabled={deactivating || updating} loading={updating} />
        <ZProfileDeactivationForm disabled={deactivating || updating} loading={deactivating} onDeactivate={handleDeactivation} />
      </div>
    );
  }

  function createProfileDeactivatedForm() {
    return <ZProfileActivationForm activation={activation} onActivationChange={handleActivation} onActivationCreate={handleReactivation} disabled={activating || reactivating} loading={activating || reactivating} />;
  }

  function createProfileForm() {
    return loginState.profile.active ? createProfileActivatedForm() : createProfileDeactivatedForm();
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
