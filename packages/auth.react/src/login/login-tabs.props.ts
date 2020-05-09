import { IZLogin } from '@zthun/auth.core';

export interface IZLoginTabsProps {
  loading: boolean;
  disabled: boolean;

  loginCredentials: IZLogin;
  createCredentials: IZLogin;
  recoverCredentials: IZLogin;

  hideLoginTab: boolean;
  hideCreateTab: boolean;
  hideRecoverTab: boolean;

  onLoginCredentialsChange(credentials: IZLogin): void;
  onCreateCredentialsChange(credentials: IZLogin): void;
  onRecoverCredentialsChange(credentials: IZLogin): void;
}
