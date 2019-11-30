import { ZUrlBuilder } from '@zthun/auth.core';
import React from 'react';
import { ZRouteButton } from '../route-button/route-button.component';
import { ZNewUserForm } from './new-user-form.component';
import { IZNewUserProperties } from './new-user-properties.interface';

export function ZNewUserPage(props: IZNewUserProperties) {
  return (
    <div className='ZNewUserPage-root'>
      <div className='ZNewUserPage-form mx-auto w-font-25 mt-em-5'>
        <ZNewUserForm signInRoute={props.signInRoute} newUserEndpoint={props.newUserEndpoint} />
      </div>
    </div>
  );
}

ZNewUserPage.defaultProps = {
  signInRoute: 'login',
  newUserEndpoint: new ZUrlBuilder().location().subdomain('api').build()
};
