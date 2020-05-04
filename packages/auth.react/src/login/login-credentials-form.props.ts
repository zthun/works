import { IZLogin } from '@zthun/auth.core';

export interface IZLoginCredentialsFormProps {
  headerText: string;
  actionText: string;
  subHeaderText: string;

  hidePassword?: boolean;
  hideConfirm?: boolean;

  run(credentials: IZLogin): Promise<void>;
}
