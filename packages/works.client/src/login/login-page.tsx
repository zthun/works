import { CircularProgress, Grid } from '@material-ui/core';
import { IZLogin } from '@zthun/works.core';
import { useAlertStack, useLoginState, useProfileAvatar, ZAlertBuilder, ZLoginTabs } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import Axios from 'axios';
import { get } from 'lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export function ZLoginPage(): JSX.Element {
  const [working, setWorking] = useState(false);
  const logged = useLoginState();
  const avatar = useProfileAvatar();
  const alerts = useAlertStack();

  async function handleLogin(login: IZLogin) {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      setWorking(true);
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Login successful.').build());
      avatar.refresh();
      await logged.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
      setWorking(false);
    }
  }

  async function handleCreate(login: IZLogin) {
    try {
      let url = new ZUrlBuilder().api().append('profiles').build();
      setWorking(true);
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Account created successfully.').build());
      url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.post(url, login);
      await logged.refresh();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
      setWorking(false);
    }
  }

  async function handleRecover(login: IZLogin) {
    try {
      const url = new ZUrlBuilder().api().append('profiles').append('recoveries').build();
      setWorking(true);
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Check your email, and if it is registered, you will get a one time password you can use to login.').build());
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(get(err, 'response.data.message', err)).build());
    } finally {
      setWorking(false);
    }
  }

  function createProgressLoading() {
    return <CircularProgress className='ZLoginPage-progress-loading' data-testid='ZLoginPage-progress-loading' color='inherit' />;
  }

  function createTabs() {
    return <ZLoginTabs onLoginCredentialsChange={handleLogin} onCreateCredentialsChange={handleCreate} onRecoverCredentialsChange={handleRecover} disabled={working} loading={working} />;
  }

  function createRedirect() {
    return <Redirect data-testid='ZLoginPage-redirect-profile' to='/profile' />;
  }

  function createContent() {
    if (logged.data) {
      return createRedirect();
    }

    if (logged.data === null) {
      return createTabs();
    }

    return createProgressLoading();
  }

  const content = createContent();

  return (
    <Grid container={true} spacing={3} justify='center' className='ZLoginPage-root' data-testid='ZLoginPage-root'>
      <Grid item={true}>{content}</Grid>
    </Grid>
  );
}
