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

// Media
import '@zthun/works.core/images';
import '@zthun/works.dal/images';
import '@zthun/works.react/images';
import '@zthun/works.nest/images';
import '@zthun/works.themes/images';

// Legal
import '@zthun/works.core/PRIVACY.md';
import '@zthun/works.core/TERMS.md';

import React from 'react';
import { render } from 'react-dom';
import { ZthunworksApp } from './app/works-app';
import './index.less';

render(<ZthunworksApp />, document.getElementById('zthunworks'));
