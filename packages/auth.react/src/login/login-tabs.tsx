import { Tab, Tabs } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { IZLogin } from '@zthun/auth.core';
import React, { useState } from 'react';
import { ZLoginCredentialsForm } from './login-credentials-form';
import { IZLoginTabsProps } from './login-tabs.props';

export function ZLoginTabs(props: IZLoginTabsProps) {
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState('login');

  async function handleRunning(fn: (credentials: IZLogin) => Promise<void>, credentials: IZLogin) {
    setRunning(true);

    try {
      await fn(credentials);
    } finally {
      setRunning(false);
    }
  }

  const handleLogin = handleRunning.bind(null, props.login);
  const handleRecover = handleRunning.bind(null, props.recover);
  const handleCreate = handleRunning.bind(null, props.create);

  function handleTabChange(event, name: string) {
    setTab(name);
  }

  return (
    <div className='ZLoginTabs-root d-flex-nowrap' data-test-id='ZLoginTabs-root'>
      <div className='ZLoginTabs-tab-container pr-sm'>
        <Tabs orientation='vertical' value={tab} onChange={handleTabChange}>
          <Tab icon={<LockOpenIcon />} label='LOGIN' value='login' disabled={running}></Tab>
          <Tab icon={<PersonAddIcon />} label='SIGNUP' value='signup' disabled={running}></Tab>
          <Tab icon={<HelpOutlineIcon />} label='RECOVER' value='recover' disabled={running}></Tab>
        </Tabs>
      </div>

      <div className='ZLoginTabs-login-form flex-grow-1' data-test-id='ZLoginTabs-login-form' hidden={tab !== 'login'}>
        <ZLoginCredentialsForm run={handleLogin} headerText='Login' subHeaderText='Enter your credentials' actionText='Login' hideConfirm={true}></ZLoginCredentialsForm>
      </div>

      <div className='ZLoginTabs-signup-form flex-grow-1' data-test-id='ZLoginTabs-signup-form' hidden={tab !== 'signup'}>
        <ZLoginCredentialsForm run={handleCreate} headerText='Create account' subHeaderText='Enter new account information' actionText='Create account'></ZLoginCredentialsForm>
      </div>

      <div className='ZLoginTabs-recover-form flex-grow-1' data-test-id='ZLoginTabs-login-recover' hidden={tab !== 'recover'}>
        <ZLoginCredentialsForm run={handleRecover} headerText='Account recovery' subHeaderText='Get back into your account' actionText='Request password reset' hidePassword={true}></ZLoginCredentialsForm>
      </div>
    </div>
  );
}
