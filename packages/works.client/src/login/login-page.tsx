import { CircularProgress } from '@material-ui/core';
import { IZLogin, ZUrlBuilder } from '@zthun/works.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZLoginTabs } from '@zthun/works.react';
import Axios from 'axios';
import { get, noop } from 'lodash';
import React from 'react';
import { Redirect } from 'react-router-dom';

export function ZLoginPage() {
  const logged = useLoginState();
  const alerts = useAlertStack();

  async function handleLogin(login: IZLogin) {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Login successful.').build());
      await logged.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    }
  }

  async function handleCreate(login: IZLogin) {
    try {
      let url = new ZUrlBuilder().api().append('users').build();
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Account created successfully.').build());
      url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.post(url, login);
      await logged.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    }
  }

  function createProgressLoading() {
    return <CircularProgress className='ZLoginPage-progress-loading' data-testid='ZLoginPage-progress-loading' color='inherit' />;
  }

  function createTabs() {
    return <ZLoginTabs onLoginCredentialsChange={handleLogin} onCreateCredentialsChange={handleCreate} onRecoverCredentialsChange={noop} />;
  }

  function createRedirect() {
    return <Redirect data-testid='ZLoginPage-redirect-profile' to='/profile' />;
  }

  function createContent() {
    switch (logged.profile) {
      case undefined:
        return createProgressLoading();
      case null:
        return createTabs();
      default:
        return createRedirect();
    }
  }

  const content = createContent();

  return (
    <div className='ZLoginPage-root mx-auto w-50' data-testid='ZLoginPage-root'>
      {content}
    </div>
  );
}
