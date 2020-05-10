import { IZLogin } from '@zthun/auth.core';
import { ZLoginTabs } from '@zthun/auth.react';
import React from 'react';

export function ZLoginPage() {
  function justRejectIt(ignore: IZLogin): void {
    const temp = new Promise((resolve, reject) => {
      setTimeout(() => reject('Not implemented yet'), 1500);
    });
  }

  return (
    <div className='ZLoginPage-root mx-auto w-50 mt-em-5'>
      <ZLoginTabs />
    </div>
  );
}
