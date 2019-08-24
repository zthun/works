import React, { Component } from 'react';
import { ZLoginForm } from './login-form';

export class ZLoginPage extends Component {
  public render() {
    return (
      <div className='ZLoginPage-root mx-auto w-font-25 mt-em-5'>
        <ZLoginForm />
      </div>
    );
  }
}
