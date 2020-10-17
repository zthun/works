import '@zthun/works.themes/svg/javascript.svg';
import '@zthun/works.themes/svg/nestjs.svg';
import '@zthun/works.themes/svg/react.svg';

import '@zthun/works.class/docs/typedoc.json';
import '@zthun/works.core/docs/typedoc.json';
import '@zthun/works.dal/docs/typedoc.json';
import '@zthun/works.draw/docs/typedoc.json';
import '@zthun/works.jest/docs/typedoc.json';
import '@zthun/works.nest/docs/typedoc.json';
import '@zthun/works.react/docs/typedoc.json';
import '@zthun/works.url/docs/typedoc.json';

import React from 'react';
import { render } from 'react-dom';
import { ZthunworksApp } from './app/works-app';
import './index.less';

render(<ZthunworksApp />, document.getElementById('zthunworks'));
