import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ZNewUserForm } from './new-user-form';
import { IZNewUserProperties } from './new-user-properties';

export class ZNewUserPageBase extends Component<Partial<IZNewUserProperties> & RouteComponentProps> {
  public static defaultProps: Partial<IZNewUserProperties> & Partial<RouteComponentProps> = {
    signInRoute: 'login'
  };

  public render() {
    return (
      <div className='ZNewUserPage-root mx-auto w-font-25 mt-em-5'>
        <ZNewUserForm signInRoute={this.props.signInRoute} />
      </div>
    );
  }
}

export const ZNewUserPage = withRouter(ZNewUserPageBase);
