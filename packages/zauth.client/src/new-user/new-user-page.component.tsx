import { IZLogin } from '@zthun/auth.core';
import React from 'react';
import { ZNewUserForm } from './new-user-form.component';

export function ZNewUserPage() {
  function handleCreate(login: IZLogin): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  return (
    <div className='ZNewUserPage-root'>
      <div className='ZNewUserPage-form mx-auto w-font-25 mt-em-5'>
        <ZNewUserForm signInRoute='login' onCreate={handleCreate} />
      </div>
    </div>
  );
}
