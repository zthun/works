import { IZLogin } from '@zthun/works.core';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { ZLoginTab } from './login-tab.enum';

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
