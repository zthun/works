import { IZLogin, IZToken, IZUser, ZUrlBuilder } from '@zthun/auth.core';
import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import { ZNewUserForm } from './new-user-form.component';

export function ZNewUserPage() {
  const history = useHistory();

  async function handleCreate(login: IZLogin): Promise<void> {
    const newUserUrl = new ZUrlBuilder().location().subdomain('api').append('users').build();
    const user = await Axios.post<IZUser>(newUserUrl, login);

    if (user.status !== 200) {
      // Error
      return;
    }

    const loginUrl = new ZUrlBuilder().location().subdomain('api').append('tokens').build();
    const token = await Axios.post<IZToken>(loginUrl, login);

    if (user.status !== 200) {
      // Error
      return;
    }

    // Save the token.
    history.push('profile');
  }

  return (
    <div className='ZNewUserPage-root'>
      <div className='ZNewUserPage-form mx-auto w-font-25 mt-em-5'>
        <ZNewUserForm signInRoute='login' onCreate={handleCreate} />
      </div>
    </div>
  );
}
