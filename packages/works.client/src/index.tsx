// Assets
import '@zthun/works.themes/svg/javascript.svg';
import '@zthun/works.themes/svg/nestjs.svg';
import '@zthun/works.themes/svg/react.svg';

// Typedoc
import '@zthun/works.class/docs/typedoc.json';
import '@zthun/works.core/docs/typedoc.json';
import '@zthun/works.dal/docs/typedoc.json';
import '@zthun/works.draw/docs/typedoc.json';
import '@zthun/works.jest/docs/typedoc.json';
import '@zthun/works.nest/docs/typedoc.json';
import '@zthun/works.react/docs/typedoc.json';
import '@zthun/works.url/docs/typedoc.json';

// Readme
import '@zthun/works.class/readme.md';
import '@zthun/works.core/readme.md';
import '@zthun/works.dal/readme.md';
import '@zthun/works.draw/readme.md';
import '@zthun/works.jest/readme.md';
import '@zthun/works.nest/readme.md';
import '@zthun/works.react/readme.md';
import '@zthun/works.url/readme.md';

import React from 'react';
import { render } from 'react-dom';
import { ZthunworksApp } from './app/works-app';
import './index.less';

render(<ZthunworksApp />, document.getElementById('zthunworks'));
