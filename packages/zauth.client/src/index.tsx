import React from 'react';
import { render } from 'react-dom';
import '../theme/index.scss';
import { ZAuthApp } from './auth-app/auth-app';

render(<ZAuthApp />, document.getElementById('z-auth-client'));
