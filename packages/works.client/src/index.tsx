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
import '@zthun/works.class/README.md';
import '@zthun/works.core/README.md';
import '@zthun/works.dal/README.md';
import '@zthun/works.draw/README.md';
import '@zthun/works.jest/README.md';
import '@zthun/works.nest/README.md';
import '@zthun/works.react/README.md';
import '@zthun/works.url/README.md';

// Metadata
import '@zthun/works.class/package.json';
import '@zthun/works.core/package.json';
import '@zthun/works.dal/package.json';
import '@zthun/works.draw/package.json';
import '@zthun/works.jest/package.json';
import '@zthun/works.nest/package.json';
import '@zthun/works.react/package.json';
import '@zthun/works.url/package.json';

// Media
import '@zthun/works.core/images/png/works.core.builders.png';
import '@zthun/works.core/images/png/works.core.config-entry.png';
import '@zthun/works.core/images/png/works.core.email.png';
import '@zthun/works.core/images/png/works.core.error.png';
import '@zthun/works.core/images/png/works.core.users.png';
import '@zthun/works.core/images/png/works.core.data.png';
import '@zthun/works.core/images/png/works.core.server.png';
import '@zthun/works.core/images/png/works.core.typedoc.png';
import '@zthun/works.core/images/svg/works.core.svg';
import '@zthun/works.react/images/png/works.react.card.png';
import '@zthun/works.react/images/png/works.react.alert.png';
import '@zthun/works.react/images/png/works.react.users.png';
import '@zthun/works.react/images/png/works.react.typedoc.png';
import '@zthun/works.react/images/svg/works.react.svg';
import '@zthun/works.nest/images/svg/works.nest.svg';
import '@zthun/works.themes/images/svg/zthunworks-owl.svg';

// Legal
import '@zthun/works.core/PRIVACY.md';
import '@zthun/works.core/TERMS.md';

import React from 'react';
import { render } from 'react-dom';
import { ZthunworksApp } from './app/works-app';
import './index.less';

render(<ZthunworksApp />, document.getElementById('zthunworks'));
