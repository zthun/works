import '@zthun/works.themes/svg/javascript.svg';
import '@zthun/works.themes/svg/nestjs.svg';
import '@zthun/works.themes/svg/react.svg';
import React from 'react';
import { render } from 'react-dom';
import { ZthunworksApp } from './app/works-app';
import './index.less';

render(<ZthunworksApp />, document.getElementById('zthunworks'));
