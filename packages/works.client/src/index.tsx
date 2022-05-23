/* istanbul ignore file */
import '@zthun/lint-janitor/docs/typedoc.json';
import '@zthun/lint-janitor/images';
import '@zthun/lint-janitor/README.md';
import '@zthun/works.class/docs/typedoc.json';
import '@zthun/works.class/README.md';
import '@zthun/works.core/docs/typedoc.json';
import '@zthun/works.core/images';
import '@zthun/works.core/PRIVACY.md';
import '@zthun/works.core/README.md';
import '@zthun/works.core/TERMS.md';
import '@zthun/works.dal/docs/typedoc.json';
import '@zthun/works.dal/images';
import '@zthun/works.dal/README.md';
import '@zthun/works.draw/docs/typedoc.json';
import '@zthun/works.draw/images';
import '@zthun/works.draw/README.md';
import '@zthun/works.jest/docs/typedoc.json';
import '@zthun/works.jest/images';
import '@zthun/works.jest/README.md';
import '@zthun/works.nest/docs/typedoc.json';
import '@zthun/works.nest/images';
import '@zthun/works.nest/README.md';
import { ZWebAppLayout } from '@zthun/works.react';
import '@zthun/works.react/docs/typedoc.json';
import '@zthun/works.react/images';
import '@zthun/works.react/README.md';
import '@zthun/works.url/docs/typedoc.json';
import '@zthun/works.url/images';
import '@zthun/works.url/README.md';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import '../images/svg/zthunworks-owl.svg';
import { ZHomePage } from './home/home-page';
import { ZApiPage } from './learn/api-page';
import { ZLearnPage } from './learn/learn-page';

render(
  <ZWebAppLayout whoami='learn' profileApp='roadblock'>
    <Route path='/home' element={<ZHomePage />} />
    <Route path='/learn/:pkg/api/:enid' element={<ZApiPage />} />
    <Route path='/learn/:pkg/api' element={<ZApiPage />} />
    <Route path='/learn/:pkg' element={<ZLearnPage />} />
  </ZWebAppLayout>,
  document.getElementById('zthunworks')
);
