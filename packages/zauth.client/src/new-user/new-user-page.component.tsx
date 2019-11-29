import { ZUrlBuilder } from '@zthun/auth.core';
import React, { Component } from 'react';
import { ZNewUserForm } from './new-user-form.component';
import { IZNewUserProperties } from './new-user-properties.interface';

export class ZNewUserPage extends Component<Partial<IZNewUserProperties>> {
  public static defaultProps: Partial<IZNewUserProperties> = {
    signInRoute: 'login',
    newUserEndpoint: new ZUrlBuilder().location().subdomain('api').build()
  };

  public render() {
    return (
      <div className='ZNewUserPage-root mx-auto w-font-25 mt-em-5'>
        <ZNewUserForm signInRoute={this.props.signInRoute} newUserEndpoint={this.props.newUserEndpoint} />
      </div>
    );
  }
}
