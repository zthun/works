import { IZLogin, ZUrlBuilder } from '@zthun/auth.core';
import { useAlertStack, ZAlertBuilder, ZLoginTabs } from '@zthun/auth.react';
import Axios from 'axios';
import React from 'react';

export function ZLoginPage() {
  const alerts = useAlertStack();

  function notImplemented() {
    alerts.add(new ZAlertBuilder().warning().message('Method not implemented.').build());
  }

  async function handleCreate(login: IZLogin) {
    try {
      const url = new ZUrlBuilder().api().append('users').build();
      await Axios.post(url, login);
      alerts.add(new ZAlertBuilder().success().message('Account created successfully.').build());
    } catch (err) {
      alerts.add(new ZAlertBuilder().error().message(err.response.data.message).build());
    }
  }

  return (
    <div className='ZLoginPage-root mx-auto w-50 mt-em-5' data-testid='ZLoginPage-root'>
      <ZLoginTabs onLoginCredentialsChange={notImplemented} onCreateCredentialsChange={handleCreate} onRecoverCredentialsChange={notImplemented} />
    </div>
  );
}
