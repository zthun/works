import { IZLogin } from '@zthun/auth.core';

export interface IZNewUserFormProps {
  signInRoute: string;
  onCreate(login: IZLogin): Promise<void>;
}
