import { Tab, Tabs } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React, { useState } from 'react';
import { ZLoginForm } from './login-form';
import { ZLoginFormRecover } from './login-form-recover';
import { ZLoginFormSignup } from './login-form-signup';

export function ZLoginTabs() {
  const [tab, setTab] = useState(0);

  function changeTab(event, index: number) {
    setTab(index);
  }

  return (
    <div className='ZLoginTabs-root d-flex-nowrap' data-test-id='ZLoginTabs-root'>
      <div className='ZLoginTabs-tab-container pr-sm'>
        <Tabs orientation='vertical' value={tab} onChange={changeTab}>
          <Tab icon={<LockOpenIcon />} label='LOGIN'></Tab>
          <Tab icon={<PersonAddIcon />} label='SIGNUP'></Tab>
          <Tab icon={<HelpOutlineIcon />} label='RECOVER'></Tab>
        </Tabs>
      </div>

      <div className='ZLoginTabs-login-form flex-grow-1' data-test-id='ZLoginTabs-login-form' hidden={tab !== 0}>
        <ZLoginForm></ZLoginForm>
      </div>

      <div className='ZLoginTabs-signup-form flex-grow-1' data-test-id='ZLoginTabs-signup-form' hidden={tab !== 1}>
        <ZLoginFormSignup></ZLoginFormSignup>
      </div>

      <div className='ZLoginTabs-recover-form flex-grow-1' data-test-id='ZLoginTabs-login-recover' hidden={tab !== 2}>
        <ZLoginFormRecover></ZLoginFormRecover>
      </div>
    </div>
  );
}
