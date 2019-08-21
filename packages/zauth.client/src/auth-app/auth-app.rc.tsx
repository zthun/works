import React from 'react';
import { IZAuthAppProperties } from './auth-app.properties';

export class ZAuthApp extends React.Component<IZAuthAppProperties> {
  public render() {
    return (
      <div className='ZAuthApp'>
        Hello, {this.props.name}, you have successfully created a react application.
      </div>
    );
  }
}
