import React from 'react';
import { render } from 'react-dom';
import { ZAuthApp } from './auth-app/auth-app';
import './index.less';

render(<ZAuthApp />, document.getElementById('z-auth-client'));
