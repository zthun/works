import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../theme/index.scss';
import { ZAuthApp } from './auth-app/auth-app';

ReactDOM.render(<ZAuthApp />, document.getElementById('z-auth-client'));
