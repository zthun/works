import { IZLogin, ZUrlBuilder } from '@zthun/auth.core';
import { useAlertStack, useLoginState, ZAlertBuilder, ZLoginTabs } from '@zthun/auth.react';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export function ZLoginPage() {
  const loginState = useLoginState();
  const alerts = useAlertStack();
  const [logged, setLogged] = useState(loginState.logged);

  useEffect(() => {
    const subscription = loginState.change.subscribe((updated) => setLogged(updated));
    return () => subscription.unsubscribe();
  });

  function notImplemented() {
    alerts.add(new ZAlertBuilder().warning().message('Method not implemented.').build());
  }

  async function handleLogin(login: IZLogin) {
    try {
      const url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Login successful.').build());
      await loginState.verify();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(err.response.data.message).build());
    }
  }

  async function handleCreate(login: IZLogin) {
    try {
      let url = new ZUrlBuilder().api().append('users').build();
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Account created successfully.').build());
      url = new ZUrlBuilder().api().append('tokens').build();
      await Axios.post(url, login);
      await loginState.verify();
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(err.response.data.message).build());
    }
  }

  if (logged) {
    return <Redirect to='/profile' />;
  } else {
    return (
      <div className='ZLoginPage-root mx-auto w-50 mt-em-5' data-testid='ZLoginPage-root'>
        <ZLoginTabs onLoginCredentialsChange={handleLogin} onCreateCredentialsChange={handleCreate} onRecoverCredentialsChange={notImplemented} />
      </div>
    );
  }
}
