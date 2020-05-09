import { Tab, Tabs } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { noop } from 'lodash';
import React, { useState } from 'react';
import { ZLoginCredentialsForm } from './login-credentials-form';
import { IZLoginTabsProps } from './login-tabs.props';

export function ZLoginTabs(props: IZLoginTabsProps) {
  const [tab, setTab] = useState('login');

  function handleTabChange(event: any, name: string) {
    setTab(name);
  }

  const loginTab = props.hideLoginTab ? null : <Tab icon={<LockOpenIcon />} label='LOGIN' value='login' disabled={props.loading}></Tab>;

  const signupTab = props.hideCreateTab ? null : <Tab icon={<PersonAddIcon />} label='SIGNUP' value='signup' disabled={props.loading}></Tab>;

  const recoverTab = props.hideRecoverTab ? null : <Tab icon={<HelpOutlineIcon />} label='RECOVER' value='recover' disabled={props.loading}></Tab>;

  return (
    <div className='ZLoginTabs-root d-flex-nowrap' data-test-id='ZLoginTabs-root'>
      <div className='ZLoginTabs-tab-container pr-sm'>
        <Tabs orientation='vertical' value={tab} onChange={handleTabChange}>
          {loginTab}
          {signupTab}
          {recoverTab}
        </Tabs>
      </div>

      <div className='ZLoginTabs-login-form flex-grow-1' data-test-id='ZLoginTabs-login-form' hidden={tab !== 'login'}>
        <ZLoginCredentialsForm
          headerText='Login'
          subHeaderText='Enter your credentials'
          actionText='Login'
          loading={props.loading}
          disabled={props.disabled}
          hideConfirm={true}
          credentials={props.loginCredentials}
          onCredentialsChange={props.onLoginCredentialsChange}
        ></ZLoginCredentialsForm>
      </div>

      <div className='ZLoginTabs-signup-form flex-grow-1' data-test-id='ZLoginTabs-signup-form' hidden={tab !== 'signup'}>
        <ZLoginCredentialsForm
          headerText='Create account'
          subHeaderText='Enter new account information'
          actionText='Create account'
          loading={props.loading}
          disabled={props.disabled}
          credentials={props.createCredentials}
          onCredentialsChange={props.onCreateCredentialsChange}
        ></ZLoginCredentialsForm>
      </div>

      <div className='ZLoginTabs-recover-form flex-grow-1' data-test-id='ZLoginTabs-login-recover' hidden={tab !== 'recover'}>
        <ZLoginCredentialsForm
          headerText='Account recovery'
          subHeaderText='Get back into your account'
          actionText='Request password reset'
          loading={props.loading}
          disabled={props.disabled}
          hidePassword={true}
          credentials={props.recoverCredentials}
          onCredentialsChange={props.onRecoverCredentialsChange}
        ></ZLoginCredentialsForm>
      </div>
    </div>
  );
}

ZLoginTabs.defaultProps = {
  loading: false,
  disabled: false,

  loginCredentials: null,
  createCredentials: null,
  recoverCredentials: null,

  hideLoginTab: false,
  hideCreateTab: false,
  hideRecoverTab: false,

  onLoginCredentialsChange: noop,
  onCreateCredentialsChange: noop,
  onRecoverCredentialsChange: noop
};
