import { Grid } from '@material-ui/core';
import { IZProfile, IZProfileActivation, ZProfileActivationBuilder } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZCircularProgress, ZProfileActivationForm, ZProfileDeactivationForm, ZProfileDeleteForm, ZProfileForm, ZProfileReactivationForm } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import { get } from 'lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Renders the profile page.
 */
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

  /**
   * Helper function that invokes the profile service to refresh it.
   *
   * @param url The user to invoke.
   * @param successMsg The message to alert upon success.
   * @param changeFn The change method to invoke on the url.
   *
   * @returns A promise that resolves if the changeFn completed successfully.  Notifies the user with an error alert
   *          if a failure occurs, but still resolves the promise.
   */
  async function handleProfileRest<T>(url: string, successMsg: string, changeFn: (url: string) => Promise<T>) {
    try {
      await changeFn(url);
      alerts.add(new ZAlertBuilder().success().message(successMsg).build());
      loginState.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    }
  }

  /**
   * Helper function for updating the profile with the put and delete verbs.
   *
   * @param successMsg The success message.
   * @param changeFn The method that invokes the http request.
   *
   * @returns A promise that completes when the request is finished.
   */
  async function handleProfileChange<T>(successMsg: string, changeFn: (url: string) => Promise<T>) {
    const url = new ZUrlBuilder().api().append('profiles').build();
    return handleProfileRest(url, successMsg, changeFn);
  }

  /**
   * Helper function for invoking changes to the profile activations.
   *
   * @param successMsg The message to display upon success.
   * @param changeFn The method that invokes the http request.
   *
   * @returns A promise that completes when the request is finished.
   */
  async function handleActivationChange<T>(successMsg: string, changeFn: (url: string) => Promise<T>) {
    const url = new ZUrlBuilder().api().append('profiles').append('activations').build();
    return handleProfileRest(url, successMsg, changeFn);
  }

  /**
   * Attempts to activate the profile.
   *
   * @param value The request body to activate with.
   *
   * @returns A promise that resolves once the request is complete.
   */
  async function handleActivation(value: IZProfileActivation) {
    setActivation(value);
    setActivating(true);
    value = new ZProfileActivationBuilder().copy(value).email(loginState.data.email).build();
    await handleActivationChange('Account activated.', (url) => Axios.put(url, value));
    setActivating(false);
  }

  /**
   * Attempts to reactivate the profile by sending the activation code again.
   *
   * @param value The request body to activate with.
   *
   * @returns A promise that resolves once the request is complete.
   */
  async function handleReactivation() {
    setReactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.data.email).build();
    setActivation(body);
    await handleActivationChange('Activation code sent. Please check your email.', (url) => Axios.post(url, body));
    setReactivating(false);
  }

  /**
   * Attempts to deactivate a profile.
   */
  async function handleDeactivation() {
    setDeactivating(true);
    const body = new ZProfileActivationBuilder().email(loginState.data.email).build();
    setActivation(body);
    await handleActivationChange('Account deactivated. Send yourself another activation code to reactivate.', (url) => Axios.delete(url));
    setDeactivating(false);
  }

  /**
   * Attemps to delete a profile.
   */
  async function handleDelete() {
    setDeleting(true);
    setActivation(null);
    await handleProfileChange('Account deleted.  You will need to create a new account.', (url) => Axios.delete(url));
    setDeleting(false);
  }

  /**
   * Attemps to update a profile.
   *
   * @param changes The changes to make to the current profile.
   */
  async function handleUpdateProfile(changes: IZProfile) {
    setUpdatingProfile(true);
    setActivation(new ZProfileActivationBuilder().email(loginState.data.email).build());
    await handleProfileChange('Account updated.', (url) => Axios.put(url, changes));
    setUpdatingProfile(false);
  }

  /**
   * Creates the jsx for the profile loading indicator.
   *
   * @returns The jsx that renders the profile loading progress.
   */
  function createProfileLoading() {
    return (
      <Grid item>
        <ZCircularProgress className='ZProfilePage-progress-profile-loading' data-testid='ZProfilePage-progress-profile-loading' size='5em' />
      </Grid>
    );
  }

  /**
   * Creates the jsx for the activation form.
   *
   * @returns The jsx that renders the activation form.
   */
  function createProfileActivatedForm() {
    return (
      <React.Fragment>
        <Grid item>
          <ZProfileForm disabled={waiting} loading={updatingProfile} profile={loginState.data} onProfileChange={handleUpdateProfile} />
        </Grid>
        <Grid item>
          <Grid container spacing={3} direction='column'>
            <Grid item>
              <ZProfileDeactivationForm disabled={waiting} loading={deactivating} onDeactivate={handleDeactivation} />
            </Grid>
            <Grid item>
              <ZProfileDeleteForm disabled={waiting} loading={deleting} onDelete={handleDelete} />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  /**
   * Creates the jsx for the deactivation form.
   *
   * @returns The jsx that renders the deactivation form.
   */
  function createProfileDeactivatedForm() {
    return (
      <React.Fragment>
        <Grid item>
          <ZProfileForm disabled={waiting} loading={updatingProfile} profile={loginState.data} onProfileChange={handleUpdateProfile} />
        </Grid>
        <Grid item>
          <Grid container spacing={3} direction='column'>
            <Grid item>
              <ZProfileActivationForm activation={activation} onActivationChange={handleActivation} disabled={waiting} loading={activating} />
            </Grid>
            <Grid item>
              <ZProfileReactivationForm onReactivate={handleReactivation} disabled={waiting} loading={reactivating} />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  /**
   * Creates the profile form.
   *
   * @returns The jsx that represents the current profile state.
   */
  function createProfileForm() {
    return loginState.data.active ? createProfileActivatedForm() : createProfileDeactivatedForm();
  }

  /**
   * Creates a redirection jsx that redirects to the login page.
   *
   * @returns The jsx that redirects to the login page.
   */
  function createProfileRedirect() {
    return <Redirect to='/login' />;
  }

  /**
   * Creates the root form profile based on the login state.
   *
   * @returns The jsx associated with the login state.
   */
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
