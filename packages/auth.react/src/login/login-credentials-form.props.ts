import { IZLogin } from '@zthun/auth.core';

export interface IZLoginCredentialsFormProps {
  headerText: string;
  subHeaderText: string;
  actionText: string;
  disabled: boolean;
  loading: boolean;

  hideEmail: boolean;
  hidePassword: boolean;
  hideConfirm: boolean;

  credentials: IZLogin;
  onCredentialsChange(val: IZLogin): void;
}
