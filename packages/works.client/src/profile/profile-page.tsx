import { Grid } from '@material-ui/core';
import { IZProfileActivation, ZProfileActivationBuilder, ZUrlBuilder, IZProfile } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZCircularProgress, ZProfileActivationForm, ZProfileDeactivationForm, ZProfileDeleteForm, ZProfileForm, ZProfileReactivationForm } from '@zthun/works.react';
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
  const [deleting, setDeleting] = useState(false);
  const [activation, setActivation] = useState(new ZProfileActivationBuilder().email(get(loginState.profile, 'email', null)).build());

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
    value = new ZProfileActivationBuilder().copy(value).email(loginState.profile.email).build();
    await handleActivationChange('Account activated.', (url) => Axios.put(url, value));
    setActivating(false);
  }

  async function handleReactivation() {
    setReactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.profile.email).build();
    setActivation(body);
    await handleActivationChange('Activation code sent. Please check your email.', (url) => Axios.post(url, body));
    setReactivating(false);
  }

  async function handleDeactivation() {
    setDeactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.profile.email).build();
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

  async function handleSave(changes: IZProfile) {
    setUpdating(true);
    await handleProfileChange('Account updated.', (url) => Axios.put(url, changes));
    setUpdating(false);
  }

  function createProfileLoading() {
    return <ZCircularProgress className='ZProfilePage-progress-profile-loading' data-testid='ZProfilePage-progress-profile-loading' size='5em' />;
  }

  function createProfileActivatedForm() {
    return (
      <div className='ZPaperCard-row'>
        <ZProfileForm disabled={deleting || deactivating || updating} loading={updating} profile={loginState.profile} onProfileChange={handleSave} />
        <div className='ZPaperCard-group'>
          <ZProfileDeactivationForm disabled={deleting || deactivating || updating} loading={deactivating} onDeactivate={handleDeactivation} />
          <ZProfileDeleteForm disabled={deleting || deactivating || updating} loading={deleting} onDelete={handleDelete} />
        </div>
      </div>
    );
  }

  function createProfileDeactivatedForm() {
    return (
      <div className='ZPaperCard-group'>
        <ZProfileActivationForm activation={activation} onActivationChange={handleActivation} disabled={activating || reactivating} loading={activating} />
        <ZProfileReactivationForm onReactivate={handleReactivation} disabled={activating || reactivating} loading={reactivating} />
      </div>
    );
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
