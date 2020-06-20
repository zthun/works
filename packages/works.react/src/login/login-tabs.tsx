import { Tab, Tabs } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { noop } from 'lodash';
import React, { useState } from 'react';
import { ZLoginCredentialsForm } from './login-credentials-form';
import { ZLoginTab } from './login-tab.enum';
import { IZLoginTabsProps } from './login-tabs.props';

/**
 * Represents a tab based ui that shows different variations of a {@link ZLoginCredentialsForm} component.
 *
 * 1.  The login tab is for creating a login token.
 * 2.  The create tab is for creating a new account.
 * 3.  The recover tab is for recovering a user password.
 *
 * @param props The properties for the component.
 */
export function ZLoginTabs(props: IZLoginTabsProps) {
  const [tab, setTab] = useState(props.tab);

  function handleTabChange(event: any, name: ZLoginTab) {
    setTab(name);
    props.onTabChange(name);
  }

  const loginTab = props.hideLoginTab ? null : <Tab className='ZLoginTabs-tab-login' data-testid='ZLoginTabs-tab-login' icon={<LockOpenIcon />} label='LOGIN' value={ZLoginTab.Login} disabled={props.loading} />;

  const signupTab = props.hideCreateTab ? null : <Tab className='ZLoginTabs-tab-create' data-testid='ZLoginTabs-tab-create' icon={<PersonAddIcon />} label='CREATE' value={ZLoginTab.Create} disabled={props.loading} />;

  const recoverTab = props.hideRecoverTab ? null : <Tab className='ZLoginTabs-tab-recover' data-testid='ZLoginTabs-tab-recover' icon={<HelpOutlineIcon />} label='RECOVER' value={ZLoginTab.Recover} disabled={props.loading} />;

  return (
    <div className='ZLoginTabs-root' data-testid='ZLoginTabs-root'>
      <div className='ZLoginTabs-tab-container'>
        <Tabs centered={true} value={tab} onChange={handleTabChange}>
          {loginTab}
          {signupTab}
          {recoverTab}
        </Tabs>
      </div>

      <div className='ZLoginTabs-form-login' data-testid='ZLoginTabs-form-login' hidden={tab !== ZLoginTab.Login}>
        <ZLoginCredentialsForm
          headerText='Login'
          subHeaderText='Enter your credentials'
          actionText='Login'
          loading={props.loading}
          disabled={props.disabled}
          hideConfirm={true}
          credentials={props.loginCredentials}
          onCredentialsChange={props.onLoginCredentialsChange}
        />
      </div>

      <div className='ZLoginTabs-form-create' data-testid='ZLoginTabs-form-create' hidden={tab !== ZLoginTab.Create}>
        <ZLoginCredentialsForm
          headerText='Create Account'
          subHeaderText='Enter new account information'
          actionText='Create account'
          loading={props.loading}
          disabled={props.disabled}
          credentials={props.createCredentials}
          onCredentialsChange={props.onCreateCredentialsChange}
        />
      </div>

      <div className='ZLoginTabs-form-recover' data-testid='ZLoginTabs-form-recover' hidden={tab !== ZLoginTab.Recover}>
        <ZLoginCredentialsForm
          headerText='Recover Account'
          subHeaderText='Get back into your account'
          actionText='Request password reset'
          loading={props.loading}
          disabled={props.disabled}
          hidePassword={true}
          credentials={props.recoverCredentials}
          onCredentialsChange={props.onRecoverCredentialsChange}
        />
      </div>
    </div>
  );
}

/**
 * The default properties.  See {@link IZLoginTabsProps} for values.
 */
ZLoginTabs.defaultProps = {
  loading: false,
  disabled: false,

  tab: ZLoginTab.Login,
  loginCredentials: null,
  createCredentials: null,
  recoverCredentials: null,

  hideLoginTab: false,
  hideCreateTab: false,
  hideRecoverTab: false,

  onTabChange: noop,
  onLoginCredentialsChange: noop,
  onCreateCredentialsChange: noop,
  onRecoverCredentialsChange: noop
};
