import React from 'react';
import { render } from 'react-dom';
import { ZthunworksApp } from './app/works-app';
import './index.less';

import '@zthun/works.themes/svg/nestjs.svg';
import '@zthun/works.themes/svg/react.svg';

render(<ZthunworksApp />, document.getElementById('zthunworks'));
