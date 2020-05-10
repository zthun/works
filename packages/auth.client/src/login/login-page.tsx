import { ZLoginTabs } from '@zthun/auth.react';
import React from 'react';

export function ZLoginPage() {
  function handleLogin() {}

  function handleCreate() {}

  function handleRecover() {}

  return (
    <div className='ZLoginPage-root mx-auto w-50 mt-em-5' data-testid='ZLoginPage-root'>
      <ZLoginTabs />
    </div>
  );
}
