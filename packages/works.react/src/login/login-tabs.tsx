import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Tab, Tabs } from '@mui/material';
import { IZLogin } from '@zthun/works.core';
import { noop } from 'lodash';
import React, { useState } from 'react';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { ZLoginCredentialsForm } from './login-credentials-form';

/**
 * Represents a tab on the login tabs component.
 */
export enum ZLoginTab {
  Login = 'login',
  Create = 'create',
  Recover = 'recover'
}

/**
 * Represents the properties for the IZLoginTabs component.
 */
export interface IZLoginTabsProps extends IZComponentLoading, IZComponentDisabled {
  /**
   * Gets or sets the selected tab.
   *
   * @default ZLoginTab.Login
   */
  tab: ZLoginTab;

  /**
   * Gets or sets the credentials for the login tab.
   *
   * @default null
   */
  loginCredentials: IZLogin;

  /**
   * Gets or sets the starting credentials for the create tab.
   *
   * @default null
   */
  createCredentials: IZLogin;

  /**
   * Gets or sets the starting credentials for the recover tab.
   *
   * @default null
   */
  recoverCredentials: IZLogin;

  /**
   * Gets or sets whether to hide the login tab.
   *
   * @default false
   */
  hideLoginTab: boolean;

  /**
   * Gets or sets whether to hide the create tab.
   *
   * @default false
   */
  hideCreateTab: boolean;

  /**
   * Gets or sets whether to hide the recover tab.
   */
  hideRecoverTab: boolean;

  /**
   * Occurs when the tab changes.
   *
   * @param tab The tab id that was selected.
   *
   * @default noop
   */
  onTabChange(tab: ZLoginTab): void;

  /**
   * Occurs when the login credentials are committed.
   *
   * @param credentials The credentials that were accepted.
   *
   * @default noop
   */
  onLoginCredentialsChange(credentials: IZLogin): void;

  /**
   * Occurs when the create credentials are committed.
   *
   * @param credentials The credentials that were accepted.
   *
   * @default noop
   */
  onCreateCredentialsChange(credentials: IZLogin): void;

  /**
   * Occurs when the recover credentials are committed.
   *
   * @param credentials The credentials that were accepted.
   *
   * @default noop
   */
  onRecoverCredentialsChange(credentials: IZLogin): void;
}

/**
 * Represents a tab based ui that shows different variations of a {@link ZLoginCredentialsForm} component.
 *
 * 1.  The login tab is for creating a login token.
 * 2.  The create tab is for creating a new account.
 * 3.  The recover tab is for recovering a user password.
 *
 * @param props The properties for the component.
 *
 * @returns The jsx that renders the login tabs.
 */
export function ZLoginTabs(props: IZLoginTabsProps) {
  const [tab, setTab] = useState(props.tab);

  /**
   * Occurs when the user changes a tab.
   *
   * This raises the onTabChange event.
   *
   * @param _ Ignored.
   * @param name The name of the tab selected.
   */
  function handleTabChange(_: any, name: ZLoginTab) {
    setTab(name);
    props.onTabChange(name);
  }

  const loginTab = props.hideLoginTab ? null : <Tab className='ZLoginTabs-tab-login' data-testid='ZLoginTabs-tab-login' icon={<LockOpenIcon />} label='LOGIN' value={ZLoginTab.Login} disabled={props.loading} />;

  const signUpTab = props.hideCreateTab ? null : <Tab className='ZLoginTabs-tab-create' data-testid='ZLoginTabs-tab-create' icon={<PersonAddIcon />} label='CREATE' value={ZLoginTab.Create} disabled={props.loading} />;

  const recoverTab = props.hideRecoverTab ? null : <Tab className='ZLoginTabs-tab-recover' data-testid='ZLoginTabs-tab-recover' icon={<HelpOutlineIcon />} label='RECOVER' value={ZLoginTab.Recover} disabled={props.loading} />;

  return (
    <div className='ZLoginTabs-root' data-testid='ZLoginTabs-root'>
      <div className='ZLoginTabs-tab-container'>
        <Tabs centered={true} value={tab} onChange={handleTabChange}>
          {loginTab}
          {signUpTab}
          {recoverTab}
        </Tabs>
      </div>

      <div className='ZLoginTabs-form-login' data-testid='ZLoginTabs-form-login' hidden={tab !== ZLoginTab.Login}>
        <ZLoginCredentialsForm
          headerText='Login'
          subHeaderText='Enter your credentials'
          actionText='Login'
          avatar={<LockOpenIcon fontSize='large' />}
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
          avatar={<PersonAddIcon fontSize='large' />}
          loading={props.loading}
          disabled={props.disabled}
          nameEmail='new-email'
          namePassword='new-password'
          nameConfirm='new-password-confirm'
          credentials={props.createCredentials}
          onCredentialsChange={props.onCreateCredentialsChange}
        />
      </div>

      <div className='ZLoginTabs-form-recover' data-testid='ZLoginTabs-form-recover' hidden={tab !== ZLoginTab.Recover}>
        <ZLoginCredentialsForm
          headerText='Recover Account'
          subHeaderText='Get back into your account'
          actionText='Request password reset'
          avatar={<HelpOutlineIcon fontSize='large' />}
          loading={props.loading}
          disabled={props.disabled}
          hidePassword={true}
          hideConfirm={true}
          nameEmail='recover-email'
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
