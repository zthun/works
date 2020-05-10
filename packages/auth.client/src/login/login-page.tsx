import { useAlertStack, ZAlertBuilder, ZLoginTabs } from '@zthun/auth.react';
import React from 'react';

export function ZLoginPage() {
  const alerts = useAlertStack();

  function notImplemented() {
    alerts.add(new ZAlertBuilder().warning().message('Method not implemented.').build());
  }

  return (
    <div className='ZLoginPage-root mx-auto w-50 mt-em-5' data-testid='ZLoginPage-root'>
      <ZLoginTabs onLoginCredentialsChange={notImplemented} onCreateCredentialsChange={notImplemented} onRecoverCredentialsChange={notImplemented} />
    </div>
  );
}
