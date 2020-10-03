import { Grid } from '@material-ui/core';
import { IZProfile, IZProfileActivation, ZProfileActivationBuilder } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZCircularProgress, ZProfileActivationForm, ZProfileDeactivationForm, ZProfileDeleteForm, ZProfileForm, ZProfileReactivationForm } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
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
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activation, setActivation] = useState(new ZProfileActivationBuilder().email(get(loginState.data, 'email', null)).build());
  const waiting = deleting || deactivating || updatingProfile || activating || reactivating;

  async function handleProfileRest<T>(url: string, successMsg: string, changeFn: (url: string) => Promise<T>) {
    try {
      await changeFn(url);
      alerts.add(new ZAlertBuilder().success().message(successMsg).build());
      loginState.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    }
  }

  async function handleProfileChange<T>(successMsg: string, changeFn: (url: string) => Promise<T>) {
    const url = new ZUrlBuilder().api().append('profiles').build();
    return handleProfileRest(url, successMsg, changeFn);
  }

  async function handleActivationChange<T>(successMsg: string, changeFn: (url: string) => Promise<T>) {
    const url = new ZUrlBuilder().api().append('profiles').append('activations').build();
    return handleProfileRest(url, successMsg, changeFn);
  }

  async function handleActivation(value: IZProfileActivation) {
    setActivation(value);
    setActivating(true);
    value = new ZProfileActivationBuilder().copy(value).email(loginState.data.email).build();
    await handleActivationChange('Account activated.', (url) => Axios.put(url, value));
    setActivating(false);
  }

  async function handleReactivation() {
    setReactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.data.email).build();
    setActivation(body);
    await handleActivationChange('Activation code sent. Please check your email.', (url) => Axios.post(url, body));
    setReactivating(false);
  }

  async function handleDeactivation() {
    setDeactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.data.email).build();
    setActivation(body);
    await handleActivationChange('Account deactivated. Send yourself another activation code to reactivate.', (url) => Axios.delete(url));
    setDeactivating(false);
  }

  async function handleDelete() {
    setDeleting(true);
    setActivation(null);
    await handleProfileChange('Account deleted.  You will need to create a new account.', (url) => Axios.delete(url));
    setDeleting(false);
  }

  async function handleUpdateProfile(changes: IZProfile) {
    setUpdatingProfile(true);
    setActivation(new ZProfileActivationBuilder().email(loginState.data.email).build());
    await handleProfileChange('Account updated.', (url) => Axios.put(url, changes));
    setUpdatingProfile(false);
  }

  function createProfileLoading() {
    return (
      <Grid item>
        <ZCircularProgress className='ZProfilePage-progress-profile-loading' data-testid='ZProfilePage-progress-profile-loading' size='5em' />
      </Grid>
    );
  }

  function createProfileActivatedForm() {
    return (
      <React.Fragment>
        <Grid item md={6}>
          <ZProfileForm disabled={waiting} loading={updatingProfile} profile={loginState.data} onProfileChange={handleUpdateProfile} />
        </Grid>
        <Grid item md={6}>
          <ZProfileDeactivationForm disabled={waiting} loading={deactivating} onDeactivate={handleDeactivation} />
        </Grid>
        <Grid item md={6}>
          <ZProfileDeleteForm disabled={waiting} loading={deleting} onDelete={handleDelete} />
        </Grid>
      </React.Fragment>
    );
  }

  function createProfileDeactivatedForm() {
    return (
      <React.Fragment>
        <Grid item md={12}>
          <ZProfileActivationForm activation={activation} onActivationChange={handleActivation} disabled={waiting} loading={activating} />
        </Grid>
        <Grid item md={12}>
          <ZProfileReactivationForm onReactivate={handleReactivation} disabled={waiting} loading={reactivating} />
        </Grid>
      </React.Fragment>
    );
  }

  function createProfileForm() {
    return loginState.data.active ? createProfileActivatedForm() : createProfileDeactivatedForm();
  }

  function createProfileRedirect() {
    return <Redirect to='/login' />;
  }

  function createContentFromProfile() {
    if (loginState.data) {
      return createProfileForm();
    }

    if (loginState.data === null) {
      return createProfileRedirect();
    }

    return createProfileLoading();
  }

  return (
    <Grid container className='ZProfilePage-root' data-testid='ZProfilePage-root' spacing={3} justify='center'>
      {createContentFromProfile()}
    </Grid>
  );
}
