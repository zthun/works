import { CircularProgress, Grid } from '@material-ui/core';
import { IZProfileActivation, ZProfileActivationBuilder, ZUrlBuilder } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZProfileActivationForm, ZProfileForm } from '@zthun/works.react';
import Axios from 'axios';
import { get } from 'lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export function ZProfilePage() {
  const loginState = useLoginState();
  const alerts = useAlertStack();
  const [loading, setLoading] = useState(false);
  const [activation, setActivation] = useState(new ZProfileActivationBuilder().email(get(loginState.profile, 'email', null)).build());

  function createActivationsUrl() {
    return new ZUrlBuilder().api().append('profiles').append('activations').build();
  }

  async function handleActivationChange(value: IZProfileActivation) {
    setActivation(value);
    setLoading(true);

    try {
      const url = createActivationsUrl();
      await Axios.put(url, value);
      alerts.add(new ZAlertBuilder().success().message('Account activated').build());
      loginState.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    } finally {
      setLoading(false);
    }
  }

  async function handleActivationCreate() {
    setLoading(true);

    try {
      const url = new ZUrlBuilder().api().append('profiles').append('activations').build();
      const body = new ZProfileActivationBuilder().email(loginState.profile.email).build();
      await Axios.post(url, body);
      alerts.add(new ZAlertBuilder().success().message('Activation code sent.  Please check your email.').build());
      loginState.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    } finally {
      setLoading(false);
    }
  }

  function createProfileLoading() {
    return <CircularProgress className='ZProfilePage-progress-profile-loading' data-testid='ZProfilePage-progress-profile-loading' color='inherit' />;
  }

  function createProfileForm() {
    return loginState.profile.active ? (
      <ZProfileForm profile={loginState.profile} loading={loading} />
    ) : (
      <ZProfileActivationForm activation={activation} onActivationChange={handleActivationChange} onActivationCreate={handleActivationCreate} loading={loading} />
    );
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
