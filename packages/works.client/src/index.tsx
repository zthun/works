/* istanbul ignore file */
import InfoIcon from '@material-ui/icons/Info';
import MouseIcon from '@material-ui/icons/Mouse';
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
import { renderMarkdownPage, ZWebAppLayout } from '@zthun/works.react';
import '@zthun/works.react/docs/typedoc.json';
import '@zthun/works.react/images';
import '@zthun/works.react/README.md';
import '@zthun/works.themes/images';
import { ZUrlBuilder } from '@zthun/works.url';
import '@zthun/works.url/docs/typedoc.json';
import '@zthun/works.url/images';
import '@zthun/works.url/README.md';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { ZHomePage } from './home/home-page';
import './index.less';
import { ZApiPage } from './learn/api-page';
import { ZLearnPage } from './learn/learn-page';
import { ZLoginPage } from './login/login-page';
import { ZProfilePage } from './profile/profile-page';

const ZUrlMarkdownTerms = new ZUrlBuilder().location().hash('').path('legal/TERMS.md').build();
const ZUrlMarkdownPrivacy = new ZUrlBuilder().location().hash('').path('legal/PRIVACY.md').build();
const ZAvatarOwl = <img className='ZTopNav-avatar' src='images/svg/zthunworks-owl.svg' />;
const renderPrivacyPage = renderMarkdownPage.bind(null, { src: ZUrlMarkdownPrivacy, headerText: 'Privacy', subHeaderText: 'Information collection', avatar: <InfoIcon fontSize='large' />, size: 'lg' });
const renderTermsPage = renderMarkdownPage.bind(null, { src: ZUrlMarkdownTerms, headerText: 'Terms', subHeaderText: 'Usage of this website', avatar: <MouseIcon fontSize='large' />, size: 'lg' });

render(
  <ZWebAppLayout headerText='Zthunworks' whoami='portal' profileApp='roadblock' avatar={ZAvatarOwl}>
    <Route exact path='/home' component={ZHomePage} />
    <Route exact path='/login' component={ZLoginPage} />
    <Route exact path='/profile' component={ZProfilePage} />
    <Route exact path='/privacy' render={renderPrivacyPage} />
    <Route exact path='/terms' render={renderTermsPage} />
    <Route exact path='/learn/:pkg' component={ZLearnPage} />
    <Route exact path='/learn/:pkg/api' component={ZApiPage} />
    <Route exact path='/learn/:pkg/api/:enid' component={ZApiPage} />
  </ZWebAppLayout>,
  document.getElementById('zthunworks')
);
